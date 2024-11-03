import { TextInput, Textarea, Button, Group, Box, FileInput } from '@mantine/core';
import { useForm } from '@mantine/form';

function ArticleForm({title, description, body, onSubmit, articleId}) {
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


        <Group position="right" mt="md" justify='end'>
          <Button type="submit" color='#4FC4E3'>Vložit</Button>
        </Group>
      </form>
    </Box>
  );
}

export default ArticleForm;