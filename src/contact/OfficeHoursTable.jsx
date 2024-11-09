import { Table } from "@mantine/core";

const elements = [
  {
    day: "Pondělí",
    ordinary: "7:00 - 11:00",
    scheduled: "11:00 - 13:00",
    visits: "14:00 - 16:00",
  },
  {
    day: "Úterý",
    ordinary: "7:00 - 11:00",
    scheduled: "11:00 - 13:00",
    visits: "16:00 - 18:00",
  },
  {
    day: "Středa",
    ordinary: "7:00 - 10:00",
    scheduled: "10:00 - 12:00",
    visits: " ",
  },
  {
    day: "Čtvrtek",
    ordinary: "7:00 - 11:00",
    scheduled: "11:00 - 13:00",
    visits: "14:00 - 16:00",
  },
  { day: "Pátek", ordinary: "7:00 - 12:00", scheduled: " ", visits: " " },
];

export function OfficeHoursTable() {
  const rows = elements.map((element) => (
    <Table.Tr key={element.day}>
      <Table.Td fw="bold">{element.day}</Table.Td>
      <Table.Td>{element.ordinary}</Table.Td>
      <Table.Td>{element.scheduled}</Table.Td>
      <Table.Td>{element.visits}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table c="white" mb="md">
      <Table.Thead>
        <Table.Tr>
          <Table.Th></Table.Th>
          <Table.Th></Table.Th>
          <Table.Th>Objednaní</Table.Th>
          <Table.Th>Návštěvy</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
