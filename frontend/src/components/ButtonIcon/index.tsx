import './styles.css';

type Props = {
  text: string;
}

const ButtonIcon = ({ text } : Props) => {
  return (
    <div className="btn-container">
      <button className="btn btn-primary">
        <h2>{text}</h2>
      </button>
    </div>
  );
};

export default ButtonIcon;
