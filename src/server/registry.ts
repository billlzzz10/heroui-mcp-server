import { z } from 'zod';

// Define a base schema for all tools
export const ToolSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  inputSchema: z.any(), // Zod schema for input validation
  outputSchema: z.any(), // Zod schema for output validation
  execute: z.function(z.tuple([z.any()]), z.promise(z.any())),
});

export type Tool = z.infer<typeof ToolSchema>;

class ToolRegistry {
  private tools: Map<string, Tool> = new Map();

  registerTool(tool: Tool): void {
    if (this.tools.has(tool.id)) {
      console.warn(`Tool with ID ${tool.id} is already registered. Overwriting.`);
    }
    this.tools.set(tool.id, tool);
  }

  getTool(id: string): Tool | undefined {
    return this.tools.get(id);
  }

  getAllTools(): Tool[] {
    return Array.from(this.tools.values());
  }

  unregisterTool(id: string): boolean {
    return this.tools.delete(id);
  }
}

export const toolRegistry = new ToolRegistry();

// Import and register all tools

// General Tools
import { HERO_GEN_DEFINE_COLOR_01 } from '../tools/general/HERO_GEN_DEFINE_COLOR_01';
import { HERO_GEN_DEFINE_TYPO_01 } from '../tools/general/HERO_GEN_DEFINE_TYPO_01';
import { HERO_GEN_DEFINE_SPACING_01 } from '../tools/general/HERO_GEN_DEFINE_SPACING_01';
import { HERO_GEN_DEFINE_SHADOW_01 } from '../tools/general/HERO_GEN_DEFINE_SHADOW_01';
import { HERO_GEN_DEFINE_INTERACTION_01 } from '../tools/general/HERO_GEN_DEFINE_INTERACTION_01';
import { HERO_GEN_DEFINE_COMPONENT_01 } from '../tools/general/HERO_GEN_DEFINE_COMPONENT_01';
import { HERO_GEN_DEFINE_LAYOUT_01 } from '../tools/general/HERO_GEN_DEFINE_LAYOUT_01';
import { HERO_GEN_DEFINE_TEMPLATE_01 } from '../tools/general/HERO_GEN_DEFINE_TEMPLATE_01';

// Component Tools
import { HERO_COMP_ACCORDION_01 } from '../tools/components/HERO_COMP_ACCORDION_01';
import { HERO_COMP_ALERT_01 } from '../tools/components/HERO_COMP_ALERT_01';
import { HERO_COMP_AUTOCOMPLETE_01 } from '../tools/components/HERO_COMP_AUTOCOMPLETE_01';
import { HERO_COMP_AVATAR_01 } from '../tools/components/HERO_COMP_AVATAR_01';
import { HERO_COMP_BADGE_01 } from '../tools/components/HERO_COMP_BADGE_01';
import { HERO_COMP_BREADCRUMBS_01 } from '../tools/components/HERO_COMP_BREADCRUMBS_01';
import { HERO_COMP_BUTTON_01 } from '../tools/components/HERO_COMP_BUTTON_01';
import { HERO_COMP_CALENDAR_01 } from '../tools/components/HERO_COMP_CALENDAR_01';
import { HERO_COMP_CARD_01 } from '../tools/components/HERO_COMP_CARD_01';
import { HERO_COMP_CHECKBOX_01 } from '../tools/components/HERO_COMP_CHECKBOX_01';
import { HERO_COMP_CHIP_01 } from '../tools/components/HERO_COMP_CHIP_01';
import { HERO_COMP_CODE_01 } from '../tools/components/HERO_COMP_CODE_01';
import { HERO_COMP_DATE_INPUT_01 } from '../tools/components/HERO_COMP_DATE_INPUT_01';
import { HERO_COMP_DATE_PICKER_01 } from '../tools/components/HERO_COMP_DATE_PICKER_01';
import { HERO_COMP_DIVIDER_01 } from '../tools/components/HERO_COMP_DIVIDER_01';
import { HERO_COMP_DRAWER_01 } from '../tools/components/HERO_COMP_DRAWER_01';
import { HERO_COMP_DROPDOWN_01 } from '../tools/components/HERO_COMP_DROPDOWN_01';
import { HERO_COMP_FORM_01 } from '../tools/components/HERO_COMP_FORM_01';
import { HERO_COMP_IMAGE_01 } from '../tools/components/HERO_COMP_IMAGE_01';
import { HERO_COMP_INPUT_OTP_01 } from '../tools/components/HERO_COMP_INPUT_OTP_01';
import { HERO_COMP_INPUT_01 } from '../tools/components/HERO_COMP_INPUT_01';
import { HERO_COMP_KBD_01 } from '../tools/components/HERO_COMP_KBD_01';
import { HERO_COMP_LINK_01 } from '../tools/components/HERO_COMP_LINK_01';
import { HERO_COMP_LISTBOX_01 } from '../tools/components/HERO_COMP_LISTBOX_01';
import { HERO_COMP_MENU_01 } from '../tools/components/HERO_COMP_MENU_01';
import { HERO_COMP_MODAL_01 } from '../tools/components/HERO_COMP_MODAL_01';
import { HERO_COMP_NAVBAR_01 } from '../tools/components/HERO_COMP_NAVBAR_01';
import { HERO_COMP_NUMBER_INPUT_01 } from '../tools/components/HERO_COMP_NUMBER_INPUT_01';
import { HERO_COMP_PAGINATION_01 } from '../tools/components/HERO_COMP_PAGINATION_01';
import { HERO_COMP_POPOVER_01 } from '../tools/components/HERO_COMP_POPOVER_01';
import { HERO_COMP_PROGRESS_01 } from '../tools/components/HERO_COMP_PROGRESS_01';
import { HERO_COMP_RADIO_01 } from '../tools/components/HERO_COMP_RADIO_01';
import { HERO_COMP_RIPPLE_01 } from '../tools/components/HERO_COMP_RIPPLE_01';
import { HERO_COMP_SCROLL_SHADOW_01 } from '../tools/components/HERO_COMP_SCROLL_SHADOW_01';
import { HERO_COMP_SELECT_01 } from '../tools/components/HERO_COMP_SELECT_01';
import { HERO_COMP_SKELETON_01 } from '../tools/components/HERO_COMP_SKELETON_01';
import { HERO_COMP_SLIDER_01 } from '../tools/components/HERO_COMP_SLIDER_01';
import { HERO_COMP_SNIPPET_01 } from '../tools/components/HERO_COMP_SNIPPET_01';
import { HERO_COMP_SPACER_01 } from '../tools/components/HERO_COMP_SPACER_01';
import { HERO_COMP_SPINNER_01 } from '../tools/components/HERO_COMP_SPINNER_01';
import { HERO_COMP_SWITCH_01 } from '../tools/components/HERO_COMP_SWITCH_01';
import { HERO_COMP_TABLE_01 } from '../tools/components/HERO_COMP_TABLE_01';
import { HERO_COMP_TABS_01 } from '../tools/components/HERO_COMP_TABS_01';
import { HERO_COMP_TOAST_01 } from '../tools/components/HERO_COMP_TOAST_01';
import { HERO_COMP_TOOLTIP_01 } from '../tools/components/HERO_COMP_TOOLTIP_01';

// Core Tools
import { HERO_CORE_REACT_01 } from '../tools/core/HERO_CORE_REACT_01';
import { HERO_CORE_SYSTEM_RSC_01 } from '../tools/core/HERO_CORE_SYSTEM_RSC_01';
import { HERO_CORE_SYSTEM_01 } from '../tools/core/HERO_CORE_SYSTEM_01';
import { HERO_CORE_THEME_01 } from '../tools/core/HERO_CORE_THEME_01';

// Hooks Tools
import { HERO_HOOK_USE_ARIA_ACCORDION_ITEM_01 } from '../tools/hooks/HERO_HOOK_USE_ARIA_ACCORDION_ITEM_01';
import { HERO_HOOK_USE_ARIA_ACCORDION_01 } from '../tools/hooks/HERO_HOOK_USE_ARIA_ACCORDION_01';
import { HERO_HOOK_USE_ARIA_BUTTON_01 } from '../tools/hooks/HERO_HOOK_USE_ARIA_BUTTON_01';
import { HERO_HOOK_USE_ARIA_LINK_01 } from '../tools/hooks/HERO_HOOK_USE_ARIA_LINK_01';
import { HERO_HOOK_USE_ARIA_MODAL_OVERLAY_01 } from '../tools/hooks/HERO_HOOK_USE_ARIA_MODAL_OVERLAY_01';
import { HERO_HOOK_USE_ARIA_MULTISELECT_01 } from '../tools/hooks/HERO_HOOK_USE_ARIA_MULTISELECT_01';
import { HERO_HOOK_USE_ARIA_OVERLAY_01 } from '../tools/hooks/HERO_HOOK_USE_ARIA_OVERLAY_01';
import { HERO_HOOK_USE_CALLBACK_REF_01 } from '../tools/hooks/HERO_HOOK_USE_CALLBACK_REF_01';
import { HERO_HOOK_USE_CLIPBOARD_01 } from '../tools/hooks/HERO_HOOK_USE_CLIPBOARD_01';
import { HERO_HOOK_USE_DATA_SCROLL_OVERFLOW_01 } from '../tools/hooks/HERO_HOOK_USE_DATA_SCROLL_OVERFLOW_01';
import { HERO_HOOK_USE_DISCLOSURE_01 } from '../tools/hooks/HERO_HOOK_USE_DISCLOSURE_01';
import { HERO_HOOK_USE_DRAGGABLE_01 } from '../tools/hooks/HERO_HOOK_USE_DRAGGABLE_01';
import { HERO_HOOK_USE_FORM_RESET_01 } from '../tools/hooks/HERO_HOOK_USE_FORM_RESET_01';
import { HERO_HOOK_USE_IMAGE_01 } from '../tools/hooks/HERO_HOOK_USE_IMAGE_01';
import { HERO_HOOK_USE_INFINITE_SCROLL_01 } from '../tools/hooks/HERO_HOOK_USE_INFINITE_SCROLL_01';
import { HERO_HOOK_USE_INTERSECTION_OBSERVER_01 } from '../tools/hooks/HERO_HOOK_USE_INTERSECTION_OBSERVER_01';
import { HERO_HOOK_USE_IS_MOBILE_01 } from '../tools/hooks/HERO_HOOK_USE_IS_MOBILE_01';
import { HERO_HOOK_USE_IS_MOUNTED_01 } from '../tools/hooks/HERO_HOOK_USE_IS_MOUNTED_01';
import { HERO_HOOK_USE_MEASURE_01 } from '../tools/hooks/HERO_HOOK_USE_MEASURE_01';
import { HERO_HOOK_USE_PAGINATION_01 } from '../tools/hooks/HERO_HOOK_USE_PAGINATION_01';
import { HERO_HOOK_USE_REAL_SHAPE_01 } from '../tools/hooks/HERO_HOOK_USE_REAL_SHAPE_01';
import { HERO_HOOK_USE_REF_STATE_01 } from '../tools/hooks/HERO_HOOK_USE_REF_STATE_01';
import { HERO_HOOK_USE_RESIZE_01 } from '../tools/hooks/HERO_HOOK_USE_RESIZE_01';
import { HERO_HOOK_USE_SAFE_LAYOUT_EFFECT_01 } from '../tools/hooks/HERO_HOOK_USE_SAFE_LAYOUT_EFFECT_01';
import { HERO_HOOK_USE_SCROLL_POSITION_01 } from '../tools/hooks/HERO_HOOK_USE_SCROLL_POSITION_01';
import { HERO_HOOK_USE_SSR_01 } from '../tools/hooks/HERO_HOOK_USE_SSR_01';
import { HERO_HOOK_USE_THEME_01 } from '../tools/hooks/HERO_HOOK_USE_THEME_01';
import { HERO_HOOK_USE_UPDATE_EFFECT_01 } from '../tools/hooks/HERO_HOOK_USE_UPDATE_EFFECT_01';
import { HERO_HOOK_USE_VIEWPORT_SIZE_01 } from '../tools/hooks/HERO_HOOK_USE_VIEWPORT_SIZE_01';

// Utility Tools
import { HERO_UTIL_ARIA_UTILS_01 } from '../tools/utilities/HERO_UTIL_ARIA_UTILS_01';
import { HERO_UTIL_DOM_ANIMATION_01 } from '../tools/utilities/HERO_UTIL_DOM_ANIMATION_01';
import { HERO_UTIL_FRAMER_UTILS_01 } from '../tools/utilities/HERO_UTIL_FRAMER_UTILS_01';
import { HERO_UTIL_REACT_RSC_UTILS_01 } from '../tools/utilities/HERO_UTIL_REACT_RSC_UTILS_01';
import { HERO_UTIL_REACT_UTILS_01 } from '../tools/utilities/HERO_UTIL_REACT_UTILS_01';
import { HERO_UTIL_SHARED_ICONS_01 } from '../tools/utilities/HERO_UTIL_SHARED_ICONS_01';
import { HERO_UTIL_SHARED_UTILS_01 } from '../tools/utilities/HERO_UTIL_SHARED_UTILS_01';
import { HERO_UTIL_STORIES_UTILS_01 } from '../tools/utilities/HERO_UTIL_STORIES_UTILS_01';
import { HERO_UTIL_TEST_UTILS_01 } from '../tools/utilities/HERO_UTIL_TEST_UTILS_01';


// Register all tools
toolRegistry.registerTool(HERO_GEN_DEFINE_COLOR_01);
toolRegistry.registerTool(HERO_GEN_DEFINE_TYPO_01);
toolRegistry.registerTool(HERO_GEN_DEFINE_SPACING_01);
toolRegistry.registerTool(HERO_GEN_DEFINE_SHADOW_01);
toolRegistry.registerTool(HERO_GEN_DEFINE_INTERACTION_01);
toolRegistry.registerTool(HERO_GEN_DEFINE_COMPONENT_01);
toolRegistry.registerTool(HERO_GEN_DEFINE_LAYOUT_01);
toolRegistry.registerTool(HERO_GEN_DEFINE_TEMPLATE_01);

toolRegistry.registerTool(HERO_COMP_ACCORDION_01);
toolRegistry.registerTool(HERO_COMP_ALERT_01);
toolRegistry.registerTool(HERO_COMP_AUTOCOMPLETE_01);
toolRegistry.registerTool(HERO_COMP_AVATAR_01);
toolRegistry.registerTool(HERO_COMP_BADGE_01);
toolRegistry.registerTool(HERO_COMP_BREADCRUMBS_01);
toolRegistry.registerTool(HERO_COMP_BUTTON_01);
toolRegistry.registerTool(HERO_COMP_CALENDAR_01);
toolRegistry.registerTool(HERO_COMP_CARD_01);
toolRegistry.registerTool(HERO_COMP_CHECKBOX_01);
toolRegistry.registerTool(HERO_COMP_CHIP_01);
toolRegistry.registerTool(HERO_COMP_CODE_01);
toolRegistry.registerTool(HERO_COMP_DATE_INPUT_01);
toolRegistry.registerTool(HERO_COMP_DATE_PICKER_01);
toolRegistry.registerTool(HERO_COMP_DIVIDER_01);
toolRegistry.registerTool(HERO_COMP_DRAWER_01);
toolRegistry.registerTool(HERO_COMP_DROPDOWN_01);
toolRegistry.registerTool(HERO_COMP_FORM_01);
toolRegistry.registerTool(HERO_COMP_IMAGE_01);
toolRegistry.registerTool(HERO_COMP_INPUT_OTP_01);
toolRegistry.registerTool(HERO_COMP_INPUT_01);
toolRegistry.registerTool(HERO_COMP_KBD_01);
toolRegistry.registerTool(HERO_COMP_LINK_01);
toolRegistry.registerTool(HERO_COMP_LISTBOX_01);
toolRegistry.registerTool(HERO_COMP_MENU_01);
toolRegistry.registerTool(HERO_COMP_MODAL_01);
toolRegistry.registerTool(HERO_COMP_NAVBAR_01);
toolRegistry.registerTool(HERO_COMP_NUMBER_INPUT_01);
toolRegistry.registerTool(HERO_COMP_PAGINATION_01);
toolRegistry.registerTool(HERO_COMP_POPOVER_01);
toolRegistry.registerTool(HERO_COMP_PROGRESS_01);
toolRegistry.registerTool(HERO_COMP_RADIO_01);
toolRegistry.registerTool(HERO_COMP_RIPPLE_01);
toolRegistry.registerTool(HERO_COMP_SCROLL_SHADOW_01);
toolRegistry.registerTool(HERO_COMP_SELECT_01);
toolRegistry.registerTool(HERO_COMP_SKELETON_01);
toolRegistry.registerTool(HERO_COMP_SLIDER_01);
toolRegistry.registerTool(HERO_COMP_SNIPPET_01);
toolRegistry.registerTool(HERO_COMP_SPACER_01);
toolRegistry.registerTool(HERO_COMP_SPINNER_01);
toolRegistry.registerTool(HERO_COMP_SWITCH_01);
toolRegistry.registerTool(HERO_COMP_TABLE_01);
toolRegistry.registerTool(HERO_COMP_TABS_01);
toolRegistry.registerTool(HERO_COMP_TOAST_01);
toolRegistry.registerTool(HERO_COMP_TOOLTIP_01);

toolRegistry.registerTool(HERO_CORE_REACT_01);
toolRegistry.registerTool(HERO_CORE_SYSTEM_RSC_01);
toolRegistry.registerTool(HERO_CORE_SYSTEM_01);
toolRegistry.registerTool(HERO_CORE_THEME_01);

toolRegistry.registerTool(HERO_HOOK_USE_ARIA_ACCORDION_ITEM_01);
toolRegistry.registerTool(HERO_HOOK_USE_ARIA_ACCORDION_01);
toolRegistry.registerTool(HERO_HOOK_USE_ARIA_BUTTON_01);
toolRegistry.registerTool(HERO_HOOK_USE_ARIA_LINK_01);
toolRegistry.registerTool(HERO_HOOK_USE_ARIA_MODAL_OVERLAY_01);
toolRegistry.registerTool(HERO_HOOK_USE_ARIA_MULTISELECT_01);
toolRegistry.registerTool(HERO_HOOK_USE_ARIA_OVERLAY_01);
toolRegistry.registerTool(HERO_HOOK_USE_CALLBACK_REF_01);
toolRegistry.registerTool(HERO_HOOK_USE_CLIPBOARD_01);
toolRegistry.registerTool(HERO_HOOK_USE_DATA_SCROLL_OVERFLOW_01);
toolRegistry.registerTool(HERO_HOOK_USE_DISCLOSURE_01);
toolRegistry.registerTool(HERO_HOOK_USE_DRAGGABLE_01);
toolRegistry.registerTool(HERO_HOOK_USE_FORM_RESET_01);
toolRegistry.registerTool(HERO_HOOK_USE_IMAGE_01);
toolRegistry.registerTool(HERO_HOOK_USE_INFINITE_SCROLL_01);
toolRegistry.registerTool(HERO_HOOK_USE_INTERSECTION_OBSERVER_01);
toolRegistry.registerTool(HERO_HOOK_USE_IS_MOBILE_01);
toolRegistry.registerTool(HERO_HOOK_USE_IS_MOUNTED_01);
toolRegistry.registerTool(HERO_HOOK_USE_MEASURE_01);
toolRegistry.registerTool(HERO_HOOK_USE_PAGINATION_01);
toolRegistry.registerTool(HERO_HOOK_USE_REAL_SHAPE_01);
toolRegistry.registerTool(HERO_HOOK_USE_REF_STATE_01);
toolRegistry.registerTool(HERO_HOOK_USE_RESIZE_01);
toolRegistry.registerTool(HERO_HOOK_USE_SAFE_LAYOUT_EFFECT_01);
toolRegistry.registerTool(HERO_HOOK_USE_SCROLL_POSITION_01);
toolRegistry.registerTool(HERO_HOOK_USE_SSR_01);
toolRegistry.registerTool(HERO_HOOK_USE_THEME_01);
toolRegistry.registerTool(HERO_HOOK_USE_UPDATE_EFFECT_01);
toolRegistry.registerTool(HERO_HOOK_USE_VIEWPORT_SIZE_01);

toolRegistry.registerTool(HERO_UTIL_ARIA_UTILS_01);
toolRegistry.registerTool(HERO_UTIL_DOM_ANIMATION_01);
toolRegistry.registerTool(HERO_UTIL_FRAMER_UTILS_01);
toolRegistry.registerTool(HERO_UTIL_REACT_RSC_UTILS_01);
toolRegistry.registerTool(HERO_UTIL_REACT_UTILS_01);
toolRegistry.registerTool(HERO_UTIL_SHARED_ICONS_01);
toolRegistry.registerTool(HERO_UTIL_SHARED_UTILS_01);
toolRegistry.registerTool(HERO_UTIL_STORIES_UTILS_01);
toolRegistry.registerTool(HERO_UTIL_TEST_UTILS_01);


