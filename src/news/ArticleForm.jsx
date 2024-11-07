import { TextInput, Textarea, Button, Group, Box, FileInput, Modal, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useRef } from 'react';

function ArticleForm({ title, description, body, onSubmit, articleId, onDeactivate }) {
  const form = useForm({
    initialValues: {
      title: title,
      description: description,
      body: body,
      image: null,
    },
    validate: {
      title: (value) => (value ? null : 'Název je povinný'),
      description: (value) => (value ? null : 'Popis je povinný'),
      body: (value) => (value ? null : 'Text článku je povinný'),
    },
  });

  const justifyBtns = onDeactivate === false ? 'end' : 'space-between';
  const [openedSubmit, { open: openSubmit, close: closeSubmit }] = useDisclosure(false);
  const [openedDelete, { open: openDelete, close: closeDelete }] = useDisclosure(false);
  const formRef = useRef(null);

  const handleSubmit = (values) => {
    console.log(values);
    onSubmit({ values, articleId });
    close();
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
          label="Název"
          placeholder="Název článku"
          {...form.getInputProps('title')}
          required
        />
        <TextInput
          withAsterisk
          label="Popis"
          placeholder="Krátký popis k zobrazení v náhledu"
          {...form.getInputProps('description')}
          required
        />
        <FileInput
          label="Obrázek článku"
          placeholder="Vložit ilustrační obrázek"
          onChange={(file) => form.setFieldValue('image', file)}
          {...form.getInputProps('image')}
        />
        <Textarea
          withAsterisk
          placeholder="Text článku"
          label="Hlavní text článku"
          autosize
          minRows={7}
          {...form.getInputProps('body')}
          required
        />
        <Group position="right" mt="md" justify={justifyBtns}>
          {onDeactivate === false ? null : (
            <>
            <Button color="red" onClick={openDelete}>
              Odstranit článek
            </Button>
            <Modal 
              opened={openedDelete}
              onClose={closeDelete}
              title="Opravdu chcete smazat článek?"
              justify="space-between"
              centered
            >
            <Text>
              Pokud stisknete <strong>Smazat článek</strong>, článek bude odstraněn.
            </Text>
            <Group justify="space-between" my="lg">
            <Button color="gray" onClick={closeDelete}>
              Zpět
            </Button>
            <Button
              color="red"
              onClick={() => onDeactivate({ articleId })}
            >
              Smazat článek
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
          title="Opravdu chcete zveřejnit článek?"
          justify="space-between"
          centered
        >
          <Text>
            Pokud stisknete <strong>Ano</strong>, článek bude zveřejněn.
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

export default ArticleForm;
