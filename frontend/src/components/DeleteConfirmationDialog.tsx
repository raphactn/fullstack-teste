import { Button, CloseButton, Dialog, Portal, Text } from "@chakra-ui/react";

type DeleteConfirmationDialogProps = {
  title: string;
  onConfirm: () => void;
  trigger: React.ReactNode;
};

export const DeleteConfirmationDialog = ({
  title,
  onConfirm,
  trigger,
}: DeleteConfirmationDialogProps) => {
  return (
    <Dialog.Root placement={"center"}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Confirmar exclusão</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Text>{title}</Text>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancelar</Button>
              </Dialog.ActionTrigger>
              <Button bg="red.500" color="white" onClick={onConfirm}>
                Deletar
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
