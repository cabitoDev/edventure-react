import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";


export const CustomCard = (props) => {
    return <Card isHoverable isPressable className="py-4">
    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
      <h4 className="font-bold text-large align-self-center">{props.title}</h4>
    </CardHeader>
    <CardBody>
      <p>{props.text}</p>
    </CardBody>
  </Card>
}