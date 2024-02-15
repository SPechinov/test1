import { FC, useEffect, useRef } from "react";
import { Props } from "./types.ts";

export const ResultCode: FC<Props> = ({ code }) => {
    const frameRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!frameRef.current) return;
        frameRef.current.innerHTML = code;
    }, [code]);

    return (
        <>
            {code.length > 0 && <h2 className="text-3xl underline mb-12">This is result</h2>}
            <div ref={frameRef} />
        </>
    );
};
