/** @jsxRuntime classic */
/** @jsx withSlots */
import * as React from 'react';
import { withSlots, createComponent, getSlots } from '@fluentui/foundation-legacy';
import { getNativeProps, htmlElementProperties, warnDeprecations } from '../../Utilities';
import { styles } from './Stack.styles';
import { StackItem } from './StackItem/StackItem';
import type { IStackComponent, IStackProps, IStackSlots } from './Stack.types';
import type { IStackItemProps } from './StackItem/StackItem.types';

const StackView: IStackComponent['view'] = props => {
  const { as: RootType = 'div', disableShrink, wrap, ...rest } = props;

  warnDeprecations('Stack', props, {
    gap: 'tokens.childrenGap',
    maxHeight: 'tokens.maxHeight',
    maxWidth: 'tokens.maxWidth',
    padding: 'tokens.padding',
  });

  // React.Fragment needs to be ignored before checking for Stack's children
  let stackChildren = React.Children.toArray(props.children);
  if (
    stackChildren.length === 1 &&
    React.isValidElement(stackChildren[0]) &&
    stackChildren[0].type === React.Fragment
  ) {
    stackChildren = stackChildren[0].props.children;
  }

  stackChildren = React.Children.map(stackChildren, (child: React.ReactElement<IStackItemProps>, index: number) => {
    if (!child) {
      return null;
    }

    if (_isStackItem(child)) {
      const defaultItemProps: IStackItemProps = {
        shrink: !disableShrink,
      };

      return React.cloneElement(child, {
        ...defaultItemProps,
        ...child.props,
      });
    }

    return child;
  });

  const nativeProps = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(rest, htmlElementProperties);

  const Slots = getSlots<IStackProps, IStackSlots>(props, {
    root: RootType,
    inner: 'div',
  });

  if (wrap) {
    return (
      <Slots.root {...nativeProps}>
        <Slots.inner>{stackChildren}</Slots.inner>
      </Slots.root>
    );
  }

  return <Slots.root {...nativeProps}>{stackChildren}</Slots.root>;
};

function _isStackItem(item: React.ReactNode): item is typeof StackItem {
  // In theory, we should be able to just check item.type === StackItem.
  // However, under certain unclear circumstances (see https://github.com/microsoft/fluentui/issues/10785),
  // the object identity is different despite the function implementation being the same.
  return (
    !!item &&
    typeof item === 'object' &&
    !!(item as React.ReactElement).type &&
    // StackItem is generated by createComponent, so we need to check its displayName instead of name
    ((item as React.ReactElement).type as React.ComponentType).displayName === StackItem.displayName
  );
}

const StackStatics = {
  Item: StackItem,
};

export const Stack: React.FunctionComponent<IStackProps> & {
  Item: React.FunctionComponent<IStackItemProps>;
} = createComponent(StackView, {
  displayName: 'Stack',
  styles,
  statics: StackStatics,
});

export default Stack;