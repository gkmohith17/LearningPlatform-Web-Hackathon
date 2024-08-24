import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

interface CourseCardProps {
  image: string;
  courseCode: string;
  courseName: string;
  onClick: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  image,
  courseCode,
  courseName,
  onClick,
}) => {
  const cardStyles = {
    maxWidth: 345,
    backgroundColor: "#FFFFFF",
    color: "#03045E",
    border: "2px solid #03045E",
    textAlign: "center",
    margin: "auto",
  };

  return (
    <Card sx={cardStyles}>
      <CardActionArea onClick={onClick}>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt="Course Image"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {courseCode}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {courseName}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CourseCard;
