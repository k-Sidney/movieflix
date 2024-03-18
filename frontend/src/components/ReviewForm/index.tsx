import { AxiosRequestConfig } from 'axios';
import { useForm } from 'react-hook-form';
import { Review } from 'types/review';
import { requestBackend } from 'util/requests';


import './styles.css';
import { toast } from 'react-toastify';

type Props = {
  movieId: string;
  onInsertReview: (review: Review) => void;
};

type FormData = {
  movieId: number;
  text: string;
};

const ReviewForm = ({ movieId, onInsertReview }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>();

  const onSubmit = (formData: FormData) => {
    formData.movieId = parseInt(movieId);
    console.log(formData);

    const config: AxiosRequestConfig = {
      method: 'POST',
      url: 'reviews',
      data: formData,
      withCredentials: true,
    };

    requestBackend(config)
      .then((response) => {
        toast.info("Avaliação inserida com sucesso!")
        setValue('text', '');
        onInsertReview(response.data);
        console.log('SALVO', response);
      })
      .catch((error) => {
        toast.error("ERRO: não é permitido texto vazio na avaliação");
        console.log('ERRO AO SALVAR', error);
      });
  };

  return (
    <div className="main-container-review">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('text', {
          //  required: 'Campo obrigatório',
          })}
          type="text"
          name="text"
          placeholder="Deixe sua avaliação aqui"
        />
        <div>{errors.text?.message}</div>
        <button type="submit" className="btn btn-primary btn-save-review" >SALVAR AVALIAÇÃO</button>
      </form>
    </div>
  );
};

export default ReviewForm;
