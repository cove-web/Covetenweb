'use client'

import Loading from '@/app/loading';
import { Suspense, useEffect, useState } from 'react';

interface MessageContentProps {
    content: any
}



const MessageContent: React.FC<MessageContentProps> = ({ content }) => {
    const [parsedContent, setParsedContent] = useState<any>('')

    useEffect(() => {
        if (content) {
            setParsedContent(content)
        }
    }, [content])

    return (
        <>
            <Suspense fallback={<div><Loading /></div>}>
                <div dangerouslySetInnerHTML={{ __html: parsedContent }} />
            </Suspense>
        </>
    );
};

export default MessageContent;