import { Children, ReactNode, isValidElement, createElement } from "react";
import { normalizeForHighlight } from "./normalizer";
import { HighlightSetting } from "@/TypeDef";
import parse, { DOMNode, Text } from "html-react-parser";

/**
 * 文字列のキーワードに一致する箇所をハイライト用タグで囲んで、JSXElementとして返す。
 * @param keyword
 * @param color
 * @param text
 * @param normalize
 * @returns
 */
const applyHighlightNode = (
  keyword: string,
  color: string,
  text: string,
  normalize: boolean
) => {
  const normalizedKeyword = normalize
    ? normalizeForHighlight(keyword)
    : keyword; // キーワードのノーマライズ
  const normalizedInputText = normalize ? normalizeForHighlight(text) : text; // 対象文字列のノーマライズ

  const regex = new RegExp(
    `(${normalizedKeyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, // 正規表現構築時に、特殊文字をエスケープする
    "g"
  ); // 正規表現構築

  let match;
  let ptr = 0;

  const jsxElements: (string | JSX.Element)[] = [];
  // ノーマライズ結果に対して、全ての検索ヒット位置を取得
  while ((match = regex.exec(normalizedInputText)) !== null) {
    // console.log(
    //   `Found ${match[0]} start=${match.index} end=${regex.lastIndex}.`
    // );
    jsxElements.push(text.slice(ptr, match.index));
    jsxElements.push(
      <span style={{ backgroundColor: color, fontWeight: "bold" }}>
        {text.slice(match.index, match.index + normalizedKeyword.length)}
      </span>
    );
    ptr = match.index + normalizedKeyword.length;
  }

  jsxElements.push(text.slice(ptr));
  return <>{jsxElements}</>;
};

/**
 *
 * @param node
 * @param hs
 * @returns
 */
const traverse = (
  node: ReactNode,
  hs: HighlightSetting,
  normalize: boolean
): ReactNode => {
  // 文字列の場合
  if (typeof node === "string") {
    return applyHighlightNode(hs.keyword, hs.color, node, normalize);
  }

  // JSX.Elementの場合
  if (isValidElement(node)) {
    if (!node.props.children) {
      return node; // 子要素がない場合、そのまま返す
    }

    // 子要素が複数の場合に対応するため、再帰的に処理
    const newChildren = Children.map(node.props.children, (child) =>
      traverse(child, hs, normalize)
    );

    // 新しい子要素で新しい要素を作成
    return createElement(node.type, { ...node.props }, newChildren);
  }

  // その他の型はそのまま返す
  return node;
};

/** ハイライト置換ハンドラ */
const HighlightHandler =
  (settings: HighlightSetting[], normalize: boolean = true) =>
  (domNode: DOMNode) => {
    if (domNode instanceof Text) {
      let jsx = <>{domNode.data}</>;
      // ハイライト設定分、テキストを置換
      settings
        .sort((s1, s2) => s2.keyword.length - s1.keyword.length)
        .forEach((s) => {
          jsx = <>{traverse(jsx, s, normalize)}</>;
        });

      return jsx;
    }
  };

// ハイライトコンポーネントサンプル
type Props = {
  text: string;
  settings?: HighlightSetting[];
  enableHighlight?: boolean;
  enableNormalize?: boolean;
};
/**
 * ハイライト用コンポーネントサンプル。
 */
export const HighlightKeywords = ({
  text,
  settings = [],
  enableHighlight = true,
  enableNormalize = true,
}: Props) => {
  if (!enableHighlight) return parse(text);
  return parse(text, { replace: HighlightHandler(settings, enableNormalize) });
};
