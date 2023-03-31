import React from "react";
import { NavLink } from "react-router-dom";
import DateDisplay from "./DateDisplay";
const PostsList = ({ children }) => {
    return (
        <div className='relative sm:pb-12 sm:ml-[calc(2rem+1px)] md:ml-[calc(3.5rem+1px)] lg:ml-[max(calc(14.5rem+1px),calc(100%-48rem))]'>
            <div className='hidden absolute top-3 bottom-0 right-full mr-7 md:mr-[3.25rem] w-px bg-slate-200 dark:bg-slate-800 sm:block' />
            <div className='space-y-16'>{children}</div>
        </div>
    );
};
const PostListItem = ({ item }) => {
    const {
        id: postId,
        attributes: { title, "publish-date": publishDate, content },
    } = item;
    // let { url } = useRouteMatch();

    return (
        <article className='relative group'>
            <div className='absolute -inset-y-2.5 -inset-x-4 md:-inset-y-4 md:-inset-x-6 sm:rounded-2xl group-hover:bg-slate-50/70 dark:group-hover:bg-slate-800/50'></div>
            <svg
                viewBox='0 0 9 9'
                className='hidden absolute right-full mr-6 top-2 text-slate-200 dark:text-slate-600 md:mr-12 w-[calc(0.5rem+1px)] h-[calc(0.5rem+1px)] overflow-visible sm:block'
            >
                <circle
                    cx='4.5'
                    cy='4.5'
                    r='4.5'
                    stroke='currentColor'
                    className='fill-white dark:fill-slate-900'
                    strokeWidth='2'
                ></circle>
            </svg>
            <div className='relative'>
                <h3 className='text-base font-semibold tracking-tight text-slate-900 dark:text-slate-200 pt-8 lg:pt-0'>
                    {title}
                </h3>
                <div className='mt-2 mb-4 prose prose-slate prose-a:relative prose-a:z-10 dark:prose-dark line-clamp-2'>
                    <p>{content}</p>
                </div>
                <dl className='absolute left-0 top-0 lg:left-auto lg:right-full lg:mr-[calc(6.5rem+1px)]'>
                    <dd className='whitespace-nowrap text-sm leading-6 dark:text-slate-400'>
                        <DateDisplay value={publishDate} />
                    </dd>
                </dl>
            </div>
            <NavLink
                to={postId}
                className='flex items-center text-sm text-sky-500 font-medium'
            >
                <span className='absolute -inset-y-2.5 -inset-x-4 md:-inset-y-4 md:-inset-x-6 sm:rounded-2xl'></span>
                <span className='relative'>Read more</span>
                <svg
                    className='relative mt-px overflow-visible ml-2.5 text-sky-300 dark:text-sky-700'
                    width='3'
                    height='6'
                    viewBox='0 0 3 6'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                >
                    <path d='M0 0L3 3L0 6'></path>
                </svg>
            </NavLink>
        </article>
    );
};
const PostListItemSkeleton = () => {
    return (
        <article className='relative group rounded-md opacity-75 animate-pulse'>
            <div className='absolute -inset-y-2.5 -inset-x-4 md:-inset-y-4 md:-inset-x-6 sm:rounded-2xl'></div>
            {/* circle */}
            <svg
                viewBox='0 0 9 9'
                className='hidden absolute right-full mr-6 top-2 text-slate-200  md:mr-12 w-[calc(0.5rem+1px)] h-[calc(0.5rem+1px)] overflow-visible sm:block'
            >
                <circle
                    cx='4.5'
                    cy='4.5'
                    r='4.5'
                    stroke='currentColor'
                    className='fill-white '
                    strokeWidth='2'
                ></circle>
            </svg>
            <div className='relative'>
                {/* date */}
                <div className='absolute left-0 top-0 lg:left-auto lg:right-full lg:mr-[calc(6.5rem+1px)] bg-slate-300  w-24 h-6 rounded-md' />
                {/* title */}
                <div className=' pt-8 lg:pt-0  '>
                    <div className='h-6 max-w-[35ch] w-full bg-slate-300 rounded-md'></div>
                </div>
                {/* content */}
                <div className='mt-2 mb-4 w-full max-w-[65ch] h-20 bg-slate-300 rounded-md' />
            </div>
            {/* read more */}
            <div className=' h-5 w-24 bg-slate-300 rounded-md'></div>
        </article>
    );
};
PostsList.Item = PostListItem;
PostsList.ItemSkeleton = PostListItemSkeleton;

export default PostsList;
