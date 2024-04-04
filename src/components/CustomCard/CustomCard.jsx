import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";


export const CustomCard = (props) => {
    return <Card isHoverable isPressable className="py-4">
    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
      <h4 className="font-bold text-large">{props.title}</h4>
    </CardHeader>
    <CardBody className="overflow-visible py-2">
      <p>{props.text}</p>
      <Image
        alt="Card background"
        className="object-cover rounded-xl"
        src={props.image}
        width={270}
      />
    </CardBody>
  </Card>
}