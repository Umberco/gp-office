import { TextInput, Textarea, Button, Group, Box, Modal, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useRef } from 'react';

function FaqForm({ question, answer, onSubmit, faqId, onDeactivate }) {
  const form = useForm({
    initialValues: {
      question: question,
      answer: answer,
    },
    validate: {
      question: (value) => (value ? null : 'Otázka je povinná'),
      answer: (value) => (value ? null : 'Odpověď je povinná'),
    },
  });

  const justifyBtns = onDeactivate === false ? 'end' : 'space-between';
  const [openedSubmit, { open: openSubmit, close: closeSubmit }] = useDisclosure(false);
  const [openedDelete, { open: openDelete, close: closeDelete }] = useDisclosure(false);
  const formRef = useRef(null);

  const handleSubmit = (values) => {
    console.log(values);
    closeSubmit();
    onSubmit({ values, faqId });
  };

  const handleOpenModal = () => {
    if (form.validate().hasErrors) {
      return;
    }
    openSubmit();
  };

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form ref={formRef} onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          withAsterisk
          label="Otázka"
          placeholder="Vložte otázku"
          {...form.getInputProps('question')}
          required
        />
        <Textarea
          withAsterisk
          label="Odpověď"
          placeholder="Vložte odpověď"
          {...form.getInputProps('answer')}
          required
        />
        <Group position="right" mt="md" justify={justifyBtns}>
          {onDeactivate === false ? null : (
            <>
            <Button color="red" onClick={openDelete}>
              Odstranit otázku
            </Button>
            <Modal 
              opened={openedDelete}
              onClose={closeDelete}
              title="Opravdu chcete smazat otázku?"
              justify="space-between"
              centered
            >
            <Text>
              Pokud stisknete <strong>Smazat otázku</strong>, otázka bude odstraněna.
            </Text>
            <Group justify="space-between" my="lg">
            <Button color="gray" onClick={closeDelete}>
              Zpět
            </Button>
            <Button
              color="red"
              onClick={() => {closeDelete(); onDeactivate({ faqId })}}
            >
              Smazat otázku
            </Button>
          </Group>
            </Modal>
            </>
          )}
          <Button color="#4FC4E3" onClick={handleOpenModal}>
            Vložit
          </Button>
        </Group>
        <Modal
          opened={openedSubmit}
          onClose={closeSubmit}
          title="Opravdu chcete zveřejnit novou otázku?"
          justify="space-between"
          centered
        >
          <Text>
            Pokud stisknete <strong>Ano</strong>, otázka bude zveřejněna.
          </Text>
          <Group justify="space-between" my="lg">
            <Button color="gray" onClick={closeSubmit}>
              Zpět
            </Button>
            <Button
              color="#4FC4E3"
              onClick={() => {
                formRef.current.requestSubmit();
              }}
            >
              Ano
            </Button>
          </Group>
        </Modal>
      </form>
    </Box>
  );
}

export default FaqForm;
