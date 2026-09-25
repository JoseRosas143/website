import { cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";
import { VisualGroup, VisualImage, VisualLink, VisualSection, VisualText } from "@/components/VisualPage";

/** Stable IDs follow the template structure, never the visitor's edited text. */
export function editableTree(node: ReactNode, path: string): ReactNode {
  if (typeof node === "string") return node.trim() ? <VisualText key={path} id={path} text={node} /> : node;
  if (Array.isArray(node)) {
    return <VisualGroup key={path} items={node.map((child,index) => ({ id: path + "." + index, section: isValidElement(child) && child.type === "section", node: editableTree(child, path + "." + index) }))} />;
  }
  if (!isValidElement(node)) return node;
  const element = node as ReactElement<Record<string, unknown>>;
  const props = element.props;
  if (typeof element.type === "string" && ["svg","script","style","textarea","input","select","option","form"].includes(element.type)) return node;
  const children = props.children === undefined ? undefined : editableTree(props.children as ReactNode, path + ".c");
  if (typeof props.src === "string" && (element.type === "img" || props.alt !== undefined)) {
    return <VisualImage key={path} id={path + ".src"} source={props.src} alt={String(props.alt || "")} imageProps={{ className: props.className as string, width: props.width as number, height: props.height as number, style: props.style as React.CSSProperties }}>{element}</VisualImage>;
  }
  if (typeof props.href === "string") {
    return <VisualLink key={path} id={path + ".href"} href={props.href} className={props.className as string}
      target={props.target as string} rel={props.rel as string} aria-label={props["aria-label"] as string}>{children}</VisualLink>;
  }
  // Preserve props and childless component behavior; never execute arbitrary components.
  const updated = cloneElement(element, { key: element.key ?? path }, ...(children === undefined ? [] : [children]));
  if (element.type === "section") { const { children: unusedChildren, ...attributes } = props; void unusedChildren; return <VisualSection key={path} id={path} attributes={attributes}>{children}</VisualSection>; }
  return updated;
}
