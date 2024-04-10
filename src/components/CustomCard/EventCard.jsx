import { Card, Spacer, Avatar } from '@nextui-org/react';

export const EventCard = ({ name, type, description, avatar }) => {
  return (
    <Card hoverable>
      <Avatar src={avatar} alt={name} size="medium" />
      <Spacer y={1} />
      <p h5>{name}</p>
      <p>{type}</p>
      <Spacer y={1} />
      <p>{description}</p>
    </Card>
  );
}

export default EventCard;