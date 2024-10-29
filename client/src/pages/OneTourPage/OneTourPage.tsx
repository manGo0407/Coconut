import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from './OneTourPage.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { CommentsType, TourType, ValueType } from '../../types';
import {
  allComments,
  authorTour,
  oneOrder,
  orderCreate,
  userUpdate,
} from '../../redux/thunkActions';

const url = import.meta.env.VITE_APP_URL;
import DisplayMap from '../../widgets/Yapi/DisplayMap';
import {
  FormControl,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputFieldProps,
  NumberInputStepper,
} from '@chakra-ui/react';
import { decrement, increment } from '../../redux/tourSlice';
import Rating from '../../components/Rating/Rating';
import Footer from '../../components/Footer/Footer';
import 'animate.css';

export default function OneTourPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const isAuth = useAppSelector((store) => store.userSlice.user);
  const order = useAppSelector((store) => store.orderSlice.order);
  const user = useAppSelector((store) => store.userSlice.user);
  const author = useAppSelector((store) => store.tourSlice.tourAuthor);

  const [rating, setRating] = useState(author.rating);
  const [quantity, setQuantity] = useState(author.quantity);

  const [isEdit, setIsEdit] = useState<number[]>([]);
  const [dataTour, setDataTour] = useState<TourType>({
    description: '',
    duration: '',
    id: 0,
    location: '',
    maxPeoples: 0,
    name: '',
    ownerId: 0,
    price: 0,
    tourPhoto: '',
    longitude: '55',
    latitude: '55',
  });
  const [textArea, setTextArea] = useState<ValueType>({ value: '' });
  const [comments, setComments] = useState<CommentsType>([]);
  const [inputs, setInputs] = useState({});
  const [isBooked, setIsBooked] = useState(false);
  const [inputUser, setInputUser] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
  });
  const [authorPhoto, setAuthorPhoto] = useState('');
  const [peoples, setPeoples] = useState<number>(2);
  const [cost, setCost] = useState(dataTour.price);
  const [imageUrl, setImageUrl] = useState('');
  const [buttonReview, setButtonReview] = useState(false);

  useEffect(() => {
    void dispatch(oneOrder(id));
    axios
      .get(`${url}/tours/${id}`, { withCredentials: true })
      .then((res) => setDataTour(res.data))
      .catch((err) => console.log(err));
    axios
      .get(`${url}/comments/${id}`, { withCredentials: true })
      .then((res) => setComments(res.data))
      .catch((err) => console.log(err));
  }, [dispatch, id]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    setCost(peoples * dataTour.price);
  }, [peoples, dataTour.price]);

  useEffect(() => {
    dispatch(authorTour(id)).then((res) => setRating(res.payload.rating));
  }, [dispatch, id]);
  useEffect(() => {
    dispatch(authorTour(id)).then((res) => setQuantity(res.payload.quantity));
  }, [dispatch, id]);

  useEffect(() => {
    axios
      .post(
        `http://localhost:3000/content/image`,
        {
          imageName: dataTour?.tourPhoto,
        },
        {
          responseType: 'blob',
        }
      )
      .then((res) => {
        const imageUrl = URL.createObjectURL(res.data);
        setImageUrl(imageUrl);
      })
      .catch((err) => console.log(err));
    if (author.photoUser) {
      axios
        .post(
          `http://localhost:3000/content/avatar`,
          {
            imageName: author.photoUser,
          },
          {
            responseType: 'blob',
          }
        )
        .then((res) => {
          const image = URL.createObjectURL(res.data);
          setAuthorPhoto(image);
        })
        .catch((err) => console.log(err));
    }
  }, [dataTour, author]);

  const buttonCommentHandler = () => {
    setButtonReview((prev) => !prev);
  };
  const userHandler = (e) => {
    setInputUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const bookedHandler = () => {
    setIsBooked((prev) => !prev);
  };

  const reserveHandler = (event) => {
    event.preventDefault();

    dispatch(
      orderCreate({
        id,
        userId: user.id,
        peoples,
        firstName: inputUser.firstName,
        lastName: inputUser.lastName,
      })
    )
      .then((res) => {
        console.log(res);
        if (res.meta.requestStatus === 'fulfilled') {
          navigate(`/lk/reserved`);
          const infoUser = {
            firstName: res.meta.firstname,
            lastName: res.meta.lastName,
          };
          dispatch(userUpdate(infoUser));
        }
      })
      .catch((err) => console.log(err));
  };

  const incrementHandler = (): void => {
    dispatch(increment());
  };

  const decrementHandler = (): void => {
    dispatch(decrement());
  };

  const addCommentHandler = () => {
    axios
      .post(`${url}/comments/${id}`, textArea, { withCredentials: true })
      .then((comm) => {
        setComments((prev) => [comm.data, ...prev]);
        setTextArea({ value: '' });
        setButtonReview(false);
      })
      .catch((err) => console.log(err));
  };

  const delCommentHandler = (commentId: number) => {
    axios
      .delete(`${url}/comments/${commentId}`, { withCredentials: true })
      .then((res) =>
        setComments((prev) =>
          prev.filter((comment) => comment.id !== commentId)
        )
      )
      .catch((err) => console.log(err));
  };

  const changeHandler = (e) => {
    setTextArea((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // const addCommentHandler = () => {
  //   axios
  //     .post(`${url}/comments/${id}`, textArea, { withCredentials: true })
  //     .then((comm) => setComments((prev) => [comm.data, ...prev]))
  //     .catch((err) => console.log(err));
  // };

  const editHandler = (commentId: number) => {
    setIsEdit((prev) => [...prev, commentId]);
  };

  const changeInputsHandler = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const saveHandler = async (updatedCommentId: number) => {
    const res = await axios.put(`${url}/comments/${updatedCommentId}`, inputs, {
      withCredentials: true,
    });
    setIsEdit([]);
    setComments((prev) =>
      prev.map((el) => (el.id === res.data[0].id ? res.data[0] : el))
    );
  };
  const pplAmountHandler = (e) => {
    setPeoples(Number(e));
  };

  const handleRatingSubmit = (ratingValue) => {
    axios
      .put(
        `${url}/users/rate`,
        {
          authorId: author.id,
          grade: ratingValue,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setTimeout(() => {
      axios
        .put(
          `${url}/users/rating`,
          {
            authorId: author.id,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          setRating(res.data.rate);
          setQuantity(res.data.quantity);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 100);
  };

  return (
    <div className={styles.content}>
      <h1 className={styles.tourName}>{dataTour?.name}</h1>
      <div className={styles.itemBox}>
        <div className={styles.photo}>
          <img
            className={`${styles.photo} animate__animated animate__backInLeft animate__delay-0.3s`}
            src={imageUrl}
            alt="picture"
          />
        </div>
        <div
          className={`${styles.imageContent} animate__animated animate__backInRight animate__delay-1s`}
        >
          <img
            className={styles.image}
            src="../../Elbrus2.jpeg"
            alt="picture"
          />
          <img className={styles.image} src="../../Elbrus3.jpg" alt="picture" />
          <img className={styles.image} src="../../Elbrus4.jpg" alt="picture" />
        </div>
      </div>
      <div className={styles.tourPageContainer}>
        <div className={styles.photoDescContainer}>
          {/* {dataTour?.tourPhoto !== "" ? (
              <img
                src={imageUrl}
                alt="photo"
                style={{ width: "400px", height: "250px" }}
              />
            ) : (
              <></>
            )} */}
          <div className={styles.author}>
            <div className={styles.textInfo}>
              <div className={styles.photoContainer}>
                <img
                  src={authorPhoto}
                  alt="photo"
                  className={styles.authorPhoto}
                />
              </div>
              <h3
                className={styles.h3}
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <Rating
                  averageRating={Number(author.rating)}
                  submitRating={handleRatingSubmit}
                  isAuth={isAuth}
                />
                {rating}
              </h3>
              {author.quantity === 0 ? (
                <h5>Вы будете первым(ой)</h5>
              ) : (
                <h5> оценили {quantity} человек(а)</h5>
              )}

              <h3>Aвтор тура: {`${author.firstName} ${author.lastName}`}</h3>
              <h3>Возраст: {author.age}</h3>
              <h3>Об авторе: {author.aboutMe}</h3>
            </div>
          </div>

          <div className={styles.desc}>
            <h2 className={styles.tourDescH1}>Описание тура</h2>
            <p>{dataTour.description}</p>
            {/* <span>Путь к сердцу Северного Кавказа, могучему потухшему вулкану, лежит через множество впечатляющих мест. Для нашего маршрута мы выбрали одни из самых интересных. Вы посетите высокогорное озеро Гижгит и Тызыльское ущелье, где укрылся затерянный мир Кабардино-Балкарии. А после с поляны Азау подниметесь на станцию Мир и насладитесь видами заснеженных вершин с высоты 3460 метров.</span> */}
            {/* <div>
            <p>- захватывающее путешествие по Кавказу в небольшой группе</p>
            <p>- исторические достопримечательности города Пятигорск</p>
            <p>- восхождение на гору Машук (преодолеем набор высоты 400 м)</p>
            <p>- два красивых ущелья: Баксанское и Чегемское</p>
            <p>- подъем на современной канатке на Эльбрус на станцию Гара-Баши (3850 м)</p>
            <p>- 15-20 минутный полет на параплане с опытным инструктором в уникальном Чегемском ущелье;</p>
            </div> */}
          </div>
        </div>
        {dataTour.latitude !== '55' ? (
          <div className={styles.mapContainer}>
            <h1>Место Сбора</h1>
            <DisplayMap
              size={{
                width: '80vw',
                height: '300px',
                border: '1mm solid rgb(88, 86, 86)',
              }}
              coords={[Number(dataTour.latitude), Number(dataTour.longitude)]}
            />
          </div>
        ) : (
          <></>
        )}
        <div className={styles.fidBackContainer}>
          <div className={styles.buttonContainer}>
            {isAuth.role === 'Турист' ? (
              <>
                {isBooked ? (
                  <form
                    onSubmit={(event) => reserveHandler(event)}
                    className={styles.checkoutForm}
                  >
                    {!user.firstName && !user.lastName && (
                      <>
                        <FormControl isRequired>
                          <FormLabel>Имя:</FormLabel>
                          <Input
                            onChange={userHandler}
                            placeholder="Введите имя"
                            name="firstName"
                            value={inputUser.firstName}
                          />
                        </FormControl>
                        <FormControl isRequired>
                          <FormLabel>Фамилия:</FormLabel>
                          <Input
                            onChange={userHandler}
                            placeholder="Введите фамилию"
                            name="lastName"
                            value={inputUser.lastName}
                          />
                        </FormControl>
                      </>
                    )}
                    <FormLabel>Кол-во бронируемых мест: </FormLabel>
                    <NumberInput
                      max={dataTour?.remaindQuantity}
                      min={2}
                      defaultValue={2}
                      onChange={pplAmountHandler}
                    >
                      <NumberInputField
                        name="peoples"
                        type="number"
                        value={peoples}
                      />
                      <NumberInputStepper>
                        <NumberIncrementStepper onClick={incrementHandler} />
                        <NumberDecrementStepper onClick={decrementHandler} />
                      </NumberInputStepper>
                    </NumberInput>
                    <FormLabel style={{ marginTop: '15px' }}>
                      Итоговая сумма: {cost} руб
                    </FormLabel>
                    <button className={styles.btnForm} type="submit">
                      Отправить
                    </button>
                  </form>
                ) : (
                  <>
                    {order?.statusBooked ? (
                      <Link to={'/lk/reserved'}>
                        <button className={styles.btnColor}>
                          Перейти к оплате
                        </button>
                      </Link>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => void bookedHandler()}
                          className={styles.btnColor}
                        >
                          Забронировать
                        </button>
                      </>
                    )}
                  </>
                )}
              </>
            ) : (
              <></>
            )}
            <Link to="/">
              <button className={styles.btnColor}>
                Посмотреть другие туры
              </button>
            </Link>

            {buttonReview ? (
              <>
                <label style={{ display: 'flex' }}>Оставить отзыв:</label>
                <textarea
                  name="value"
                  id="commentValue"
                  cols="10"
                  rows="5"
                  onChange={changeHandler}
                ></textarea>
                <button
                  className={styles.button}
                  type="button"
                  onClick={() => addCommentHandler()}
                >
                  Оставить отзыв
                </button>
              </>
            ) : isAuth.role === 'Турист' ? (
              <button
                className={styles.btnColor}
                type="button"
                onClick={buttonCommentHandler}
              >
                Оставить отзыв
              </button>
            ) : null}
          </div>
          <div className={styles.commentsLabelContainer}>
            <h1 className={styles.tourDescH1}>Отзывы туристов:</h1>
            <div className={styles.reviewContainer}>
              {comments.length ? <></> : <p>Тут пока нет отзывов...</p>}
              {comments &&
                comments.map((comment) => (
                  <div className={styles.commentContainer} key={comment.id}>
                    <p>{comment.User?.login || user.login}</p>
                    {isEdit.find((el) => el === comment.id) ? (
                      <>
                        <input
                          defaultValue={comment.value}
                          name="value"
                          onChange={changeInputsHandler}
                        ></input>
                        <p>
                          {JSON.stringify(`${comment.createdAt.slice(0, 10)}`)}
                        </p>
                        <button
                          type="button"
                          onClick={() => saveHandler(comment.id)}
                        >
                          Сохранить
                        </button>
                      </>
                    ) : (
                      <>
                        <p>{comment.value}</p>
                        <p>
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </p>
                      </>
                    )}
                    {isAuth.id === comment.userId ? (
                      <>
                        <button
                          type="button"
                          onClick={() => editHandler(comment.id)}
                          className={styles.reviewBtn}
                        >
                          Редактировать
                        </button>
                        <button
                          type="button"
                          onClick={() => delCommentHandler(comment.id)}
                          className={styles.reviewBtn}
                        >
                          Удалить
                        </button>
                      </>
                    ) : (
                      <></>
                    )}
                    <br />
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/* {dataTour.latitude !== "55" ? (
          <h1 className={styles.mapContainer}>
            Место Сбора:
            <DisplayMap
            size={ {
              width: '300px',
              height: '300px',
              border: '2mm ridge rgba(211, 220, 50, 0.6)',
            }}
              coords={[Number(dataTour.latitude), Number(dataTour.longitude)]}
            />
          </h1>
        ) : (
          <></>
        )} */}
      </div>
      <Footer />
    </div>
  );
}
