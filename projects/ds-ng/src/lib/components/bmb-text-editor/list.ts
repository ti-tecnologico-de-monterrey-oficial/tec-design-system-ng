import { IActions } from './types';
import { BmbTextEditorComponent } from './bmb-text-editor.component';
import { BmbTranslationsService } from '../../services/translations/translations.service';

export function getSettingsList(
  ctx: BmbTextEditorComponent,
  translate: BmbTranslationsService,
): IActions[] {
  return [
    {
      icon: 'format_align_left',
      name: translate.translate('text_editor.left'),
      action: () => {
        ctx.applyAlignment('left');
        ctx.closeProjectedContent();
      },
    },
    {
      icon: 'format_align_center',
      name: translate.translate('text_editor.center'),
      action: () => {
        ctx.applyAlignment('center');
        ctx.closeProjectedContent();
      },
    },
    {
      icon: 'format_align_right',
      name: translate.translate('text_editor.right'),
      action: () => {
        ctx.applyAlignment('right');
        ctx.closeProjectedContent();
      },
    },
    {
      icon: 'format_list_numbered',
      name: translate.translate('text_editor.insert_ordered_list'),
      action: () => {
        ctx.execCommand('insertOrderedList');
        ctx.closeProjectedContent();
      },
    },
    {
      icon: 'format_list_bulleted',
      name: translate.translate('text_editor.insert_unordered_list'),
      action: () => {
        ctx.execCommand('insertUnorderedList');
        ctx.closeProjectedContent();
      },
    },
    {
      icon: 'format_indent_increase',
      name: translate.translate('text_editor.indent'),
      action: () => {
        ctx.execCommand('indent');
        ctx.closeProjectedContent();
      },
    },
    {
      icon: 'format_indent_decrease',
      name: translate.translate('text_editor.outdent'),
      action: () => {
        ctx.execCommand('outdent');
        ctx.closeProjectedContent();
      },
    },
  ];
}

export function getInsertList(
  ctx: BmbTextEditorComponent,
  translate: BmbTranslationsService,
): IActions[] {
  return [
    {
      icon: 'link',
      name: translate.translate('text_editor.insert_link'),
      action: () => {
        ctx.closeProjectedContent();
        ctx.openPrompt('link', null);
        ctx.closeProjectedContent();
      },
    },
    {
      icon: 'image',
      name: translate.translate('text_editor.insert_image'),
      action: () => {
        ctx.closeProjectedContent();
        ctx.openPrompt('image', null);
        ctx.closeProjectedContent();
      },
    },
  ];
}
