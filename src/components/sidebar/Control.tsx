import { ActionIcon, Burger, Group, type GroupProps } from "@mantine/core";
import { IconMessage } from "@tabler/icons-react";

interface Props {
  opened: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  justify: GroupProps["justify"];
  lightHidden: boolean;
}

export default function Control({
  opened,
  onClick,
  justify,
  lightHidden,
}: Props) {
  return (
    <Group lightHidden={lightHidden} justify={justify}>
      <Burger opened={opened} onClick={onClick} size="sm" />
      <ActionIcon c="black" size="sm" variant="transparent">
        <IconMessage />
      </ActionIcon>
    </Group>
  );
}
