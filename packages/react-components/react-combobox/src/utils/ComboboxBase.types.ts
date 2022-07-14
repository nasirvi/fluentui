import * as React from 'react';
import type { PositioningShorthand } from '@fluentui/react-positioning';
import type { ComboboxContextValue } from '../contexts/ComboboxContext';
import type { OptionValue, OptionCollectionState } from '../utils/OptionCollection.types';
import { SelectionEvents, SelectionProps, SelectionState } from '../utils/Selection.types';

/**
 * ComboboxBase Props
 * Shared types between Combobox and Dropdown components
 */
export type ComboboxBaseProps = SelectionProps & {
  /**
   * Controls the colors and borders of the combobox trigger.
   * @default 'outline'
   */
  appearance?: 'filled-darker' | 'filled-lighter' | 'outline' | 'underline';

  /**
   * The default open state when open is uncontrolled
   */
  defaultOpen?: boolean;

  /**
   * The default value when the combobox's value is uncontrolled
   */
  defaultValue?: string;

  /**
   * Render the combobox's popup inline in the DOM.
   * This has accessibility benefits, particularly for touch screen readers.
   */
  inlinePopup?: boolean;

  /**
   * Callback when the open/closed state of the dropdown changes
   */
  onOpenChange?: (e: ComboboxBaseOpenEvents, data: ComboboxBaseOpenChangeData) => void;

  /**
   * Sets the open/closed state of the dropdown.
   * Use together with onOpenChange to fully control the dropdown's visibility
   */
  open?: boolean;

  /**
   * If set, the placeholder will show when no value is selected
   */
  placeholder?: string;

  /**
   * Configure the positioning of the combobox dropdown
   *
   * @defaultvalue below
   */
  positioning?: PositioningShorthand;

  /**
   * Controls the size of the combobox faceplate
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * The value displayed by the Combobox.
   * Use this with `onSelect` to directly control the displayed value string
   */
  value?: string;
};

/**
 * State used in rendering Combobox
 */
export type ComboboxBaseState = Required<Pick<ComboboxBaseProps, 'appearance' | 'open' | 'inlinePopup' | 'size'>> &
  Pick<ComboboxBaseProps, 'placeholder' | 'value'> &
  OptionCollectionState &
  SelectionState & {
    /* Option data for the currently highlighted option (not the selected option) */
    activeOption?: OptionValue;

    /* Callback when an option is clicked, for internal use */
    onOptionClick(event: React.MouseEvent, option: OptionValue): void;

    selectOption(event: SelectionEvents, optionValue: string): void;

    setActiveOption(option?: OptionValue): void;

    setOpen(event: ComboboxBaseOpenEvents, newState: boolean): void;
  };

/**
 * Data for the Combobox onOpenChange event.
 */
export type ComboboxBaseOpenChangeData = {
  open: boolean;
};

/* Possible event types for onOpen */
export type ComboboxBaseOpenEvents =
  | React.MouseEvent<HTMLElement>
  | React.KeyboardEvent<HTMLElement>
  | React.FocusEvent<HTMLElement>;

export type ComboboxBaseContextValues = {
  combobox: ComboboxContextValue;
};