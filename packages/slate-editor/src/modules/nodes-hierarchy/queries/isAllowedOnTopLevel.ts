import {
    isAttachmentNode,
    isBookmarkNode,
    isContactNode,
    isCoverageNode,
    isDividerNode,
    isEmbedNode,
    isGalleryNode,
    isHeadingNode,
    isHtmlNode,
    isImageNode,
    isListNode,
    isParagraphNode,
    isQuoteNode,
    isStoryBookmarkNode,
    isStoryEmbedNode,
    isTableNode,
    isVideoNode,
} from '@prezly/slate-types';
import type { Node } from 'slate';

import { isImageCandidateElement } from '#extensions/image';
import { isLoaderElement } from '#extensions/loader';
import { PlaceholderNode } from '#extensions/placeholders';

export function isAllowedOnTopLevel(node: Node) {
    return (
        isBookmarkNode(node) ||
        isAttachmentNode(node) ||
        isContactNode(node) ||
        isCoverageNode(node) ||
        isDividerNode(node) ||
        isEmbedNode(node) ||
        isGalleryNode(node) ||
        isHeadingNode(node) ||
        isHtmlNode(node) ||
        isImageNode(node) ||
        isImageCandidateElement(node) ||
        isLoaderElement(node) ||
        isParagraphNode(node) ||
        PlaceholderNode.isPlaceholderNode(node) ||
        isQuoteNode(node) ||
        isStoryBookmarkNode(node) ||
        isStoryEmbedNode(node) ||
        isVideoNode(node) ||
        isListNode(node) ||
        isTableNode(node)
    );
}
