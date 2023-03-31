import React from "react";
// Librares
import { useSelector } from "react-redux";
// Components
import PostsList from "../../components/PostsList";
//State
import {
    loadingStatusSelector,
    postsListSelector,
} from "../../store/postsSlice";

const PostsListPage = () => {
    const skeletonCount = 3;

    const loadingStatus = useSelector(loadingStatusSelector());
    const posts = useSelector(postsListSelector());

    const displaySkeleton =
        loadingStatus === "idle" || loadingStatus === "pending";

    return (
        <div>
            <header className='py-16 sm:text-center'>
                <h1 className='mb-4 text-3xl sm:text-4xl tracking-tight text-slate-900 font-extrabold'>
                    Latest News
                </h1>
                <p className='text-lg text-slate-700'>
                    All the latest React Router news, straight from the team.
                </p>
            </header>

            <PostsList>
                {displaySkeleton &&
                    new Array(skeletonCount)
                        .fill("")
                        .map((_, index) => (
                            <PostsList.ItemSkeleton key={"skeleton" + index} />
                        ))}
                {posts &&
                    !displaySkeleton &&
                    posts.map((item) => (
                        <PostsList.Item key={"post" + item.id} item={item} />
                    ))}
            </PostsList>
        </div>
    );
};

export default PostsListPage;
