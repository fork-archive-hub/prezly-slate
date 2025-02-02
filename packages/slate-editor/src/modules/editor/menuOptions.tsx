import type { Editor } from 'slate';

import * as Icons from '#icons';

import type { Option } from '#extensions/floating-add-menu';
import { UploadcareEditor } from '#modules/uploadcare';

export enum MenuAction {
    ADD_ATTACHMENT = 'add_attachment',
    ADD_CONTACT = 'add_contact',
    ADD_COVERAGE = 'add_coverage',
    ADD_DIVIDER = 'add_divider',
    ADD_TABLE = 'add_table',
    ADD_EMBED = 'add_embed',
    ADD_EMBED_SOCIAL = 'add_embed_social',
    ADD_GALLERY = 'add_gallery',
    ADD_HEADING_1 = 'add_heading_1',
    ADD_HEADING_2 = 'add_heading_2',
    ADD_IMAGE = 'add_image',
    ADD_PARAGRAPH = 'add_paragraph',
    ADD_QUOTE = 'add_quote',
    ADD_VIDEO = 'add_video',
    ADD_WEB_BOOKMARK = 'add_web_bookmark',
    ADD_STORY_EMBED = 'add_story_embed',
    ADD_STORY_BOOKMARK = 'add_story_bookmark',
    ADD_SNIPPET = 'add_snippet',
}

enum Group {
    TEXT_N_LAYOUT = 'Text & layout',
    MEDIA_CONTENT = 'Media content',
    PREZLY_CONTENT = 'Prezly content',
}

interface Params {
    withAttachments: boolean;
    withBlockquotes: boolean;
    withCoverage: boolean;
    withDivider: boolean;
    withTables: boolean;
    withEmbeds: boolean;
    withEmbedSocial: boolean;
    withGalleries: boolean;
    withHeadings: boolean;
    withImages: boolean;
    withParagraphs: boolean;
    withPressContacts: boolean;
    withStoryEmbeds: boolean;
    withStoryBookmarks: boolean;
    withVideos: boolean;
    withWebBookmarks: boolean;
    withSnippets: boolean;
}

/**
 * Keeping track of suggestions ordering in one place.
 */
const Suggested: Partial<Record<MenuAction, number>> = {
    [MenuAction.ADD_IMAGE]: 1,
    [MenuAction.ADD_CONTACT]: 2,
    [MenuAction.ADD_GALLERY]: 3,
    [MenuAction.ADD_DIVIDER]: 4,
    [MenuAction.ADD_ATTACHMENT]: 5,
    [MenuAction.ADD_SNIPPET]: 5,
};

export function generateFloatingAddMenuOptions(
    editor: Editor,
    params: Params,
): Option<MenuAction>[] {
    const options = Array.from(generateOptions(editor, params));
    return options.map((option) => ({ ...option, suggested: Suggested[option.action] }));
}

function* generateOptions(
    editor: Editor,
    {
        withAttachments,
        withBlockquotes,
        withCoverage,
        withDivider,
        withTables,
        withEmbeds,
        withEmbedSocial,
        withGalleries,
        withHeadings,
        withImages,
        withParagraphs,
        withPressContacts,
        withStoryEmbeds,
        withStoryBookmarks,
        withSnippets,
        withVideos,
        withWebBookmarks,
    }: Params,
): Generator<Omit<Option<MenuAction>, 'suggested'>> {
    if (withHeadings) {
        yield {
            icon: Icons.ComponentH1,
            action: MenuAction.ADD_HEADING_1,
            group: Group.TEXT_N_LAYOUT,
            text: 'Heading 1',
            keywords: ['title'],
            description: 'Big section heading',
        };
        yield {
            icon: Icons.ComponentH2,
            action: MenuAction.ADD_HEADING_2,
            group: Group.TEXT_N_LAYOUT,
            text: 'Heading 2',
            keywords: ['title', 'subtitle'],
            description: 'Medium section heading',
        };
    }

    if (withParagraphs) {
        yield {
            icon: Icons.ComponentText,
            action: MenuAction.ADD_PARAGRAPH,
            group: Group.TEXT_N_LAYOUT,
            text: 'Text',
            description: 'Start writing plain text',
        };
    }

    if (withBlockquotes) {
        yield {
            icon: Icons.ComponentQuote,
            action: MenuAction.ADD_QUOTE,
            group: Group.TEXT_N_LAYOUT,
            text: 'Quote',
            keywords: ['citation'],
            description: 'Highlight a text section',
        };
    }

    if (withDivider) {
        yield {
            icon: Icons.ComponentDivider,
            action: MenuAction.ADD_DIVIDER,
            group: Group.TEXT_N_LAYOUT,
            text: 'Divider',
            keywords: ['line', 'separator'],
            description: 'Divide blocks with a line',
        };
    }

    if (withTables) {
        yield {
            action: MenuAction.ADD_TABLE,
            icon: Icons.ComponentTable,
            group: Group.TEXT_N_LAYOUT,
            text: 'Table',
            description: 'Insert a table',
            isNew: true,
        };
    }

    if (withImages && UploadcareEditor.isUploadcareEditor(editor)) {
        yield {
            action: MenuAction.ADD_IMAGE,
            icon: Icons.ComponentImage,
            group: Group.MEDIA_CONTENT,
            text: 'Image',
            keywords: ['photo', 'picture'],
            description: 'Place an image',
        };
    }

    if (withGalleries && UploadcareEditor.isUploadcareEditor(editor)) {
        yield {
            action: MenuAction.ADD_GALLERY,
            icon: Icons.ComponentGallery,
            group: Group.MEDIA_CONTENT,
            text: 'Gallery',
            description: 'Create an image composition',
        };
    }

    if (withVideos) {
        yield {
            action: MenuAction.ADD_VIDEO,
            icon: Icons.ComponentVideo,
            group: Group.MEDIA_CONTENT,
            text: 'Video',
            description: 'Place a video from a URL',
        };
    }

    if (withEmbedSocial) {
        yield {
            action: MenuAction.ADD_EMBED_SOCIAL,
            icon: Icons.ComponentSocialPost,
            group: Group.MEDIA_CONTENT,
            text: 'Social post',
            description: 'Embed a social media link',
            isBeta: true,
        };
    }

    if (withAttachments && UploadcareEditor.isUploadcareEditor(editor)) {
        yield {
            action: MenuAction.ADD_ATTACHMENT,
            icon: Icons.ComponentAttachment,
            group: Group.MEDIA_CONTENT,
            text: 'File attachment',
            description: 'Upload or link a file',
        };
    }

    if (withWebBookmarks) {
        yield {
            action: MenuAction.ADD_WEB_BOOKMARK,
            icon: Icons.ComponentWebBookmark,
            group: Group.MEDIA_CONTENT,
            text: 'Website bookmark',
            keywords: ['link'],
            description: 'Insert a visual website link',
            isNew: true,
        };
    }

    if (withEmbeds) {
        yield {
            action: MenuAction.ADD_EMBED,
            icon: Icons.ComponentEmbed,
            group: Group.MEDIA_CONTENT,
            text: 'Embed',
            description: 'Insert embeddable content',
            isBeta: true,
        };
    }

    if (withCoverage) {
        yield {
            action: MenuAction.ADD_COVERAGE,
            icon: Icons.ComponentCoverage,
            group: Group.PREZLY_CONTENT,
            text: 'Coverage',
            description: 'Add a link to a Prezly Coverage',
        };
    }

    if (withPressContacts) {
        yield {
            action: MenuAction.ADD_CONTACT,
            icon: Icons.ComponentContact,
            group: Group.PREZLY_CONTENT,
            text: 'Contact',
            keywords: ['signature'],
            description: 'Add your site contacts',
        };
    }

    if (withStoryEmbeds) {
        yield {
            action: MenuAction.ADD_STORY_EMBED,
            icon: Icons.ComponentWebBookmark,
            group: Group.PREZLY_CONTENT,
            text: 'Story embed',
            description: 'Insert Prezly story content',
            isBeta: true,
        };
    }

    if (withStoryBookmarks) {
        yield {
            action: MenuAction.ADD_STORY_BOOKMARK,
            icon: Icons.ComponentStoryBookmark,
            group: Group.PREZLY_CONTENT,
            text: 'Story bookmark',
            description: 'Embed your Prezly content',
            isBeta: true,
        };
    }

    if (withSnippets) {
        yield {
            action: MenuAction.ADD_SNIPPET,
            icon: Icons.ComponentSnippet,
            group: Group.PREZLY_CONTENT,
            text: 'Snippets',
            description: 'Insert reusable content blocks',
            isNew: true,
        };
    }

    /*
     * Intentionally not included:
     * - MenuAction.ADD_EMBED_VIDEO
     * - MenuAction.ADD_EMBED_LINK
     */
}
