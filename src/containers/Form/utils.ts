import { ThreeElement, TagInfo, GroupInfo } from "../../types";

const generateId = (() => {
  let index = 0;
  return () => index++;
})();

const getTagInfo = (code: string): TagInfo => {
  const sliced = code.split(" ");

  const tag = (() => {
    if (sliced[0].startsWith("</")) {
      return sliced[0].substring(2, sliced[0].length - 1);
    }

    return sliced[0].endsWith(">")
      ? sliced[0].substring(1, sliced[0].length - 1)
      : sliced[0].substring(1, sliced[0].length);
  })();

  return {
    id: generateId(),
    tag,
    fullTag: code,
  };
};

const findFirstTag = (
  code: string,
  cursor: number,
  isOpen: boolean,
  tagName?: string,
) => {
  const match = (() => {
    if (isOpen) {
      if (tagName) return RegExp(`<${tagName}[^>]*>`);
      return RegExp(/<[^/][^>]*>/);
    } else {
      if (tagName) return RegExp(`</${tagName}>`);
      return RegExp(/<\/[^>]*>/);
    }
  })().exec(code.slice(cursor, code.length));

  if (!match) return null;
  const startPosition = (match.index ?? 0) + cursor;

  return {
    info: getTagInfo(match[0]),
    startPosition,
    endPosition: startPosition + match[0].length - 1,
  };
};

const returnText = (code: string) => {
  return {
    tagInfo: { tag: "", fullTag: "", id: generateId() },
    content: code,
    codeLeft: "",
  };
};

const findFirstGroupTag = (code: string): GroupInfo => {
  const tagOpenedGroup = findFirstTag(code, 0, true);
  if (!tagOpenedGroup) return returnText(code);

  let tagClosedGroup: ReturnType<typeof findFirstTag> = null;

  let deep = 1;
  let cursor = tagOpenedGroup.endPosition;

  while (deep > 0) {
    if (cursor > code.length) return returnText(code);

    const openTag = findFirstTag(code, cursor, true, tagOpenedGroup.info.tag);
    const closeTag = findFirstTag(code, cursor, false, tagOpenedGroup.info.tag);

    if (!closeTag) return returnText(code);

    if (!openTag || openTag.startPosition > closeTag.startPosition) {
      cursor = closeTag.endPosition;
      deep--;
    } else {
      cursor = openTag.endPosition;
      deep++;
    }
    if (deep === 0) {
      tagClosedGroup = closeTag;
    }
  }

  if (!tagOpenedGroup || !tagClosedGroup) return returnText(code);

  if (tagOpenedGroup.info.tag !== tagClosedGroup.info.tag)
    return returnText(code);

  return {
    tagInfo: tagOpenedGroup.info,
    content: code.slice(
      tagOpenedGroup.endPosition + 1,
      tagClosedGroup.startPosition,
    ),
    codeLeft: code.slice(tagClosedGroup.endPosition + 1),
  };
};

const getFirstLevelGroups = (code: string): ThreeElement[] => {
  const result: ThreeElement[] = [];
  let leftCode: string = code;

  while (leftCode.length) {
    const group = findFirstGroupTag(leftCode);
    leftCode = group.codeLeft;

    result.push({
      tagInfo: group.tagInfo,
      content: group.content,
      children: [],
    });
  }

  return result;
};

export const codeToThree = (code: string): ThreeElement[] => {
  const result: ThreeElement[] = getFirstLevelGroups(code);

  if (!result.length) return result;

  const parse = (parsingArray: ThreeElement[]) => {
    parsingArray.forEach((item) => {
      if (!item.tagInfo.tag || !item.content) return;
      item.children = getFirstLevelGroups(item.content);
      parse(item.children);
    });
  };

  parse(result);

  return result;
};
