import React from "react"

export default function PageTitle({title, description}: {title: string; description?: string}): React.JSX.Element {
    return (
        <>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-foreground">{title}</h1>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
        </>
    );
}