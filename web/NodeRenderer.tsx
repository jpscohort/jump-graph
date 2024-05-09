import { Handle, Position,NodeResizer } from "reactflow";
import type { NodeProps } from "./types";
import { useEditorContext } from "./context";
import { useEffect, useRef } from "react";

const targetHandleCommonStyle = {
  position: "absolute",
  opacity: 0,
  border: "none",
  borderRadius: 0,
  pointerEvents: "none",
  width: "10px",
  height: "10px",
  transform: "translate(-5px, -5px)",
} as const;

export const nodeRendererHandleIds = {
  top: "top",
  right: "right",
  bottom: "bottom",
  left: "left",
} as const;

export default ({ id, data }: NodeProps) => {
  const { updateNodeNote } = useEditorContext();

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current && data.note !== inputRef.current.value)
      inputRef.current.value = data.note;
  }, [data.note]);

  return (
    <div
      style={{
        padding: "6px",
        backgroundColor: data.isHead ? "#ddffff" : "unset",
      }}
    >
      <div style={{ fontWeight: "bold", fontSize: "1.1em" }}>
        {[
          data.sourceLocation.uri.split("/").pop(),
          data.sourceLocation.line + 1,
        ].join(":")}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          overflow: "hidden",
        }}
      >
        <div
          title={data.sourceLocation.uri}
          style={{
            flexGrow: 1,
            whiteSpace: "nowrap",
            fontSize: "0.9em",
            color: "#666",
          }}
        >
          {data.sourceLocation.uri.split("/").slice(0, -1).join("/")}
        </div>
      </div>
      {/* The state change on the parent is not immediately reflected in the child node, so this input is intentionally set uncontrolled. */}
      <input
        ref={inputRef}
        className="nodrag"
        title={data.note}
        style={{
          width: "100%",
          padding: "4px 0",
          border: "none",
          outline: "none",
          background: "initial",
          textAlign: "center",
          font: "inherit",
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
        onDoubleClick={(e) => {
          e.stopPropagation();
        }}
        onChange={(e) => {
          updateNodeNote(id, e.target.value);
        }}
      />
      <NodeResizer minWidth={100} minHeight={30} />
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};
