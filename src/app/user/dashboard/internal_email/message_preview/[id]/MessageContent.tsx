import React from 'react';

function MessageContent({ content }: any) {
    // Render the Quill content as HTML
    return (
        <div dangerouslySetInnerHTML={{ __html: content }} />
    );
}

export default MessageContent;
