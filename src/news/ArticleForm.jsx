import { TextInput, Textarea, Button, Group, Box, FileInput, Modal } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';

function ArticleForm({title, description, body, onSubmit, articleId, onDeactivate}) {
  const form = useForm({
    initialValues: {
      title: title,
      description: description,
      body: body,
      image: null
    },

    validate: {
      //body: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const justifyBtns = onDeactivate === false ? "end" : "space-between"
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={form.onSubmit((values) => {console.log(values); onSubmit({values, articleId})})}>
        <TextInput
          withAsterisk
          label="Název"
          placeholder="Název článku"
          {...form.getInputProps('title')}
        />
        <TextInput
          withAsterisk
          label="Popis"
          placeholder="Krátký popis k zobrazení v náhledu"
          {...form.getInputProps('description')}
        />

        {/* TODO ještě zda je správně nastaven update hodnoty */}
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
        />


        <Group position="right" mt="md" justify={justifyBtns}>
          {onDeactivate === false ? <></> : <Button color='red' onClick={() => onDeactivate({articleId})}>Odstranit článek</Button>}
          <Button color='#4FC4E3' onClick={open}>Vložit</Button>
        </Group>
        <Modal opened={opened} onClose={close} title="Opravdu chcete zveřejnit článek?">
        <Button type="submit" color='#4FC4E3'>Ano</Button>
        </Modal>
      </form>
    </Box>
  );
}

export default ArticleForm;