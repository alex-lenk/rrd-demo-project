import React from "react";
const DateDisplay = ({ value }) => {
    const displayDate = new Date(value).toLocaleDateString("en-us", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
    return <time dateTime={value}>{displayDate}</time>;
};

export default DateDisplay;
