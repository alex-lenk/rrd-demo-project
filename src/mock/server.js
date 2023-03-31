import {
    createServer,
    Model,
    belongsTo,
    Factory,
    JSONAPISerializer,
    Response,
} from "miragejs";
import { nanoid } from "nanoid";
import { faker } from "@faker-js/faker";
function getAvatar() {
    return `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
        .toString(36)
        .substring(7)}.svg`;
}
const dataBaseDump = localStorage.getItem("dbDump");
const incorrectPassOrEmailRequest = () => {
    return new Response(
        400,
        {},
        {
            message: "Incorrect email or password",
        }
    );
};
const generateAccessToken = (userId) => {
    return `${nanoid(10)}.userId-${userId}.accessToken`;
};

export function makeServer({ environment = "development" }) {
    return createServer({
        environment,

        models: {
            users: Model.extend(),
            tokens: Model.extend({
                user: belongsTo("users"),
            }),
            posts: Model.extend(),
        },

        serializers: {
            application: JSONAPISerializer,
        },
        factories: {
            post: Factory.extend({
                title(i) {
                    return `Blog Post ${i}. ${faker.lorem.words(3)}`;
                },
                publishDate() {
                    return faker.date.betweens(
                        "2020-01-01T00:00:00.000Z",
                        "2023-01-01T00:00:00.000Z",
                        1
                    )[0];
                },
                content() {
                    return faker.lorem.paragraphs(3, "||");
                },
            }),
        },

        seeds(server) {
            if (!dataBaseDump) {
                server.createList("post", 5);
            }
        },

        routes() {
            if (environment === "development") {
                this.pretender.handledRequest = () => {
                    let dump = this.db.dump();
                    localStorage.setItem("dbDump", JSON.stringify(dump));
                };
                if (dataBaseDump) this.db.loadData(JSON.parse(dataBaseDump));
            }
            this.timing = 1500;
            this.namespace = "api";
            // Posts Fake Api
            this.resource("posts");

            // LogIn Fake
            this.post("/auth/login", (schema, request) => {
                // Parse body
                const attr = JSON.parse(request.requestBody);

                // Check user exist in database
                const user = schema.users.where({ username: attr.username })
                    .models[0];
                if (!user) return incorrectPassOrEmailRequest();

                // Compare password data
                const isPassEquals = user.password === attr.password;
                if (!isPassEquals) return incorrectPassOrEmailRequest();
                //Genegate new tokens
                const accessToken = generateAccessToken(user.attrs.id);

                // Save Token to database
                schema.tokens.create({
                    user: user,
                    accessToken,
                });

                // Send Response
                return { accessToken, user: { ...user.attrs } };
            });

            // Sign Up Fake
            this.post("/auth/signup", (schema, request) => {
                // Parse body
                const attr = JSON.parse(request.requestBody);

                // Check user exist in database
                const isUserExist =
                    schema.users.where({ email: attr.email }).models.length > 0;

                // Send Error if exist
                if (isUserExist)
                    return new Response(
                        400,
                        {},
                        {
                            message: "User with given email already exist",
                        }
                    );
                // Create new user in database
                const user = schema.users.create({
                    ...attr,
                    avatar: getAvatar(),
                });

                const {
                    attrs: { id: userId },
                } = user;

                // Generate fake token
                const accessToken = generateAccessToken(userId);

                schema.tokens.create({
                    user: user,
                    accessToken,
                });
                // Send Tokens and UserId
                return { accessToken, user: { ...user.attrs } };
            });
            this.get("/auth/signup");
        },
    });
}
