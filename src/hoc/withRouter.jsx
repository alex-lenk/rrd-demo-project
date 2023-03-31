import { BrowserRouter } from "react-router-dom";

const withRouter =
    (Component) =>
    ({ ...props }) => {
        return (
            <BrowserRouter>
                <Component {...props} />
            </BrowserRouter>
        );
    };

export default withRouter;
