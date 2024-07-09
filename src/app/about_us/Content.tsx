'use client'
import React from 'react';

function Content({ content }: any) {
    // Render the Quill content as HTML
    return (
        <div dangerouslySetInnerHTML={{ __html: content }} />
    );
}

export default Content;
