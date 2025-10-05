import React, { useState } from 'react'
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import { LuCode, LuCopy, LuCheck } from 'react-icons/lu';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

function AiResponsePreview({ content }) {
    if (!content) return null
    return (
        <div className="w-full">
            <div className="text-sm text-slate-300 max-w-none leading-relaxed">
                <ReactMarkdown remarkPlugins={[remarkGfm]}
                    components={{
                        code({ node, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '');

                            const language = match ? match[1] : '';
                            const isInline = !className;
                            return !isInline ? (
                                <CodeBlock
                                    code={String(children).replace(/\n$/, '')}
                                    language={language}
                                />
                            ) : (
                                <code className="px-2 py-1 bg-slate-700 text-indigo-300 rounded text-sm" {...props}>
                                    {children}
                                </code>
                            )
                        },
                        p({ children }) {
                            return <p className="mb-3 text-slate-300 leading-relaxed">{children}</p>
                        },
                        strong({ children }) {
                            return <strong className="text-white font-semibold">{children}</strong>
                        },
                        em({ children }) {
                            return <em className="text-indigo-300">{children}</em>
                        },
                        ul({ children }) {
                            return <ul className="list-disc pl-6 space-y-2 my-4 text-slate-300">{children}</ul>
                        },
                        ol({ children }) {
                            return <ol className="list-decimal pl-6 space-y-2 my-4 text-slate-300">{children}</ol>
                        },
                        li({ children }) {
                            return <li className="mb-1">{children}</li>
                        },
                        blockquote({ children }) {
                            return <blockquote className="border-l-4 border-indigo-500 pl-4 italic text-slate-400 my-4 bg-slate-800/30 py-2 rounded-r">{children}</blockquote>
                        },
                        h1({ children }) {
                            return <h1 className="text-2xl font-bold mt-6 mb-4 text-white">{children}</h1>
                        },
                        h2({ children }) {
                            return <h2 className="text-xl font-bold mt-6 mb-3 text-white">{children}</h2>
                        },
                        h3({ children }) {
                            return <h3 className="text-lg font-bold mt-5 mb-2 text-white">{children}</h3>
                        },
                        h4({ children }) {
                            return <h4 className="text-base font-bold mt-4 mb-2 text-white">{children}</h4>
                        },
                        a({ children, href }) {
                            return <a href={href} className="text-indigo-400 hover:text-indigo-300 hover:underline" target="_blank" rel="noopener noreferrer">{children}</a>
                        },
                        table({ children }) {
                            return <div className="overflow-x-auto my-4">
                                <table className="min-w-full divide-y divide-gray-300 border border-gray-200">
                                    {children}
                                </table>
                            </div>
                        }, thead({ children }) {
                            return <thead className="bg-gray-50">{children}</thead>
                        },
                        tbody({ children }) {
                            return <tbody className="divide-y divide-gray-200">{children}</tbody>
                        },
                        tr({ children }) {
                            return <tr>{children}</tr>
                        },
                        th({ children }) {
                            return <th className="px-3 py-2 text-xs text-left font-medium text-gray-500 uppercase tracking-wider">{children}</th>

                        }, hr({ }) {
                            return <hr className="my-6 border-gray-200" />
                        },
                        img({ src, alt }) {
                            return <img src={src} alt={alt} className="max-w-full my-4 rounded" />
                        },
                    }}
                >
                    {content}
                </ReactMarkdown>
            </div>

        </div>
    )
}

export const CodeBlock = ({ code, language }) => {
    const [copied, setCopied] = useState(false);

    const copyCode = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    }
    
    return (
        <div className="relative my-6 rounded-lg overflow-hidden bg-slate-800 border border-slate-600">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-700 border-b border-slate-600">
                <div className="flex items-center space-x-2">
                    <LuCode size={16} className="text-slate-400"/>
                    <span className="text-xs font-semibold text-slate-300 uppercase tracking-wide">{language || 'Code'}</span>
                </div>
                <button onClick={copyCode} className="text-slate-400 hover:text-slate-200 focus:outline-none relative group" aria-label="Copy code">
                    {copied ? (<LuCheck size={16} className="text-green-400" />) : (<LuCopy size={16} />)}
                    {copied && (
                        <span className="absolute -top-8 right-0 bg-slate-900 text-white text-xs rounded-md px-2 py-1 opacity-90">
                            Copied!
                        </span>
                    )}
                </button>
            </div>
            <SyntaxHighlighter 
                language={language} 
                style={oneDark} 
                customStyle={{
                    fontSize: 13,
                    margin: 0,
                    padding: '1rem',
                    background: 'transparent'
                }}
            >
                {code}
            </SyntaxHighlighter>
        </div>
    )
}

export default AiResponsePreview
