import './LoginImageSection.css';
import cafeImage from '../../assets/cafe.png';

export default function LoginImageSection() {
  return (
    <div className="image-section">
      <img src={cafeImage} alt="Café au Caramelo" />
    </div>
  );
}

