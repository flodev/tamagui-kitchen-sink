import {
  Adapt,
  Button,
  Dialog,
  DialogProps,
  Sheet,
  SizeTokens,
  VisuallyHidden,
  XStack,
} from 'tamagui'
import { ReactNode } from 'react'
import { X } from '@tamagui/lucide-icons'
import { useWindowDimensions } from 'react-native'

type LmDialogProps = DialogProps & {
  trigger?: ReactNode
  title?: string
  description?: string
  hideCloseButton?: boolean
  fullScreen?: boolean
  contentPadding?: SizeTokens
  dialogHeight?: string | number
  dialogWidth?: string | number
}

export function LmDialog({
  children,
  trigger,
  title,
  description,
  hideCloseButton,
  fullScreen,
  contentPadding = '$4',
  dialogWidth,
  dialogHeight,
  ...dialogProps
}: LmDialogProps) {
  const { width, height } = useWindowDimensions()
  return (
    <Dialog modal {...dialogProps}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
      <Adapt when="sm" platform="touch">
        <Sheet zIndex={200_000} modal dismissOnSnapToBottom>
          <Sheet.Frame padding="$10">
            <Adapt.Contents />
          </Sheet.Frame>
          <Dialog.Sheet.Overlay />
        </Sheet>
      </Adapt>
      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Dialog.Content
          key="content"
          padding={'$0'}
          bordered
          elevate
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          x={0}
          scale={1}
          opacity={1}
          y={0}
          {...(fullScreen
            ? {
                width,
                height,
              }
            : {
                maxHeight: '90%',
                maxWidth: '90%',
                width: dialogWidth,
                height: dialogHeight,
              })}
        >
          {(!hideCloseButton || title) && (
            <XStack
              space
              justifyContent={'space-between'}
              paddingRight={contentPadding}
              paddingLeft={contentPadding}
              paddingTop={contentPadding}
            >
              {title ? (
                <Dialog.Title>{title}</Dialog.Title>
              ) : (
                <VisuallyHidden>
                  <Dialog.Title></Dialog.Title>
                </VisuallyHidden>
              )}
              {!hideCloseButton && (
                <Dialog.Close asChild>
                  <Button size="$3" circular chromeless icon={X} />
                </Dialog.Close>
              )}
            </XStack>
          )}

          {description ? (
            <Dialog.Description
              paddingTop={contentPadding}
              paddingRight={contentPadding}
              paddingLeft={contentPadding}
            >
              {description}
            </Dialog.Description>
          ) : (
            <VisuallyHidden>
              <Dialog.Description />
            </VisuallyHidden>
          )}
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  )
}
