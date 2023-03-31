import React from "react";
// Librares
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
// Store
import { loadingStatusSelector, postSelector } from "../../store/postsSlice";
// Components
import DateDisplay from "../../components/DateDisplay";
import SpinnerLader from "../../components/SpinnerLoader";
import BackButton from "../../components/BackButton";

const PostPage = () => {
    const { postId } = useParams();

    const loadingStatus = useSelector(loadingStatusSelector());
    const post = useSelector(postSelector(postId));

    if (loadingStatus !== "pending" && loadingStatus !== "idle" && !post) {
        return <Navigate to='/posts' />;
    }

    return (
        <>
            <div className='max-w-8xl mx-auto'>
                <div className='flex px-4 pt-8 pb-10 lg:px-8 '>
                    <BackButton> Go back</BackButton>
                </div>
            </div>
            <div className='px-4 sm:px-6 md:px-9'>
                <div className='max-w-3xl mx-auto pb-28'>
                    <main>
                        {loadingStatus === "pending" && (
                            <div className='text-center'>
                                <SpinnerLader />
                            </div>
                        )}
                        {post && (
                            <article className='relative pt-10'>
                                <h1 className='text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-200 md:text-3xl '>
                                    {post.attributes.title}
                                </h1>
                                <div className='text-sm leading-6'>
                                    <dl>
                                        <dd className='absolute top-0 inset-x-0 text-slate-700 dark:text-slate-400'>
                                            <DateDisplay
                                                value={
                                                    post.attributes[
                                                        "publish-date"
                                                    ]
                                                }
                                            />
                                        </dd>
                                    </dl>
                                </div>
                                <div className='mt-6 prose prose-slate max-w-none'>
                                    {post.attributes.content
                                        .split("||")
                                        .map((part, index) => (
                                            <p key={index}>{part}</p>
                                        ))}
                                </div>
                            </article>
                        )}
                    </main>
                </div>
            </div>
        </>
    );
};

export default PostPage;
