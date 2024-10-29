import { Container } from "@chakra-ui/layout";
import { Grid, GridItem, Textarea } from "@chakra-ui/react";
import React, { useState } from "react";
import InputLine from "../../widgets/InputLine/InputLine";
import ButtonBlank from "../../widgets/Button/Button";
import { useDispatch } from "react-redux";
import { addTour } from "../../redux/thunkActions";
import OriginalMap from "../../widgets/Yapi/OriginalMap";
import styles from "./NewTourForm.module.css";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function NewTourForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [coords, setCoords] = useState([]);
  const [inputs, setInputs] = useState({
    title: "",
    price: "",
    description: "",
    duration: "",
    limit: "",
    startOfTheTour: "",
    endOfTheTour: "",
    location: "",
    gatherTime: "",
  });
  const [pic, setPic] = useState(null);
  const [drag, setDrag] = useState(false);

  const changePhotoHandler = (e) => {
    setPic(e.target.files[0]);
    const files = e.target.files;
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = function (e) {
        const preview = document.getElementById("preview");
        preview.src = e.target.result;
        preview.style.display = "block";
      };
      reader.readAsDataURL(file);
    }
  };

  const changeHandler = (event) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    console.log(inputs);
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    const resultAction = await dispatch(
      addTour({ payload: inputs, pic, coords })
    );
    if (addTour.fulfilled.match(resultAction)) {
      toast.success(resultAction.payload);
      console.log("popali v fullfield");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } else if (addTour.rejected.match(resultAction)) {
      console.log("popali v rejected");
      toast.error(resultAction.payload);
    }
  };

  const dragStartHandler = (e) => {
    e.preventDefault();
    setDrag(true);
  };
  const dragLeaveHandler = (e) => {
    e.preventDefault();
    setDrag(false);
  };
  const onDropHandler = (e) => {
    e.preventDefault();
    setPic(e.dataTransfer.files[0]);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = function (e) {
        const preview = document.getElementById("preview");
        preview.src = e.target.result;
        preview.style.display = "block";
      };
      reader.readAsDataURL(file);
    }
    setDrag(false);
  };

  return (
    <div className={styles.content}>
      <ToastContainer />
      <div className={styles.picMap}>
        <div className={styles.picBlock}>
          {drag ? (
            <div
              className={styles.dropArea}
              onDragStart={(e) => dragStartHandler(e)}
              onDragLeave={(e) => dragLeaveHandler(e)}
              onDragOver={(e) => dragStartHandler(e)}
              onDrop={(e) => onDropHandler(e)}
            >
              Отпустите файл
            </div>
          ) : (
            <div
              className={styles.dragArea}
              onDragStart={(e) => dragStartHandler(e)}
              onDragLeave={(e) => dragLeaveHandler(e)}
              onDragOver={(e) => dragStartHandler(e)}
            >
              {pic ? "" : "Поднесите фото или"}
              {pic ? (
                <>
                  <img
                    id="preview"
                    src="#"
                    alt="Preview"
                    style={{ display: "none" }}
                    className={styles.preview}
                  />
                  <label className={styles.label}>
                    Изменить выбранный файл
                    <input
                      className={styles.fileInput}
                      type="file"
                      onChange={changePhotoHandler}
                      accept="image/*"
                    />
                  </label>
                </>
              ) : (
                <label className={styles.label}>
                  Выберите файл
                  <input
                    className={styles.fileInput}
                    type="file"
                    onChange={changePhotoHandler}
                    accept="image/*"
                  />
                </label>
              )}
            </div>
          )}
        </div>
        <div>
          <OriginalMap setCoords={setCoords} />
        </div>
      </div>
      <form onSubmit={submitHandler} className={styles.form}>
        <div className={styles.inputsBox}>
          <div className={styles.container}>
            <div className={styles.inputs}>
              <InputLine
                type={"text"}
                name={"title"}
                value={inputs.title}
                handler={changeHandler}
                label={'Название тура'}
              />
            </div>
            <div className={styles.inputs}>
              <InputLine
                type={"number"}
                name={"price"}
                value={inputs.price}
                handler={changeHandler}
                label={'Цена'}
              />
            </div>
            <div className={styles.inputs}>
              <InputLine
                type={"number"}
                name={"limit"}
                value={inputs.limit}
                handler={changeHandler}
                label={'Размер группы'}
              />
            </div>
          </div>
          <div className={styles.container}>
            <div className={styles.inputs}>
              <InputLine
                type={"time"}
                name={"gatherTime"}
                value={inputs.gatherTime}
                handler={changeHandler}
                label={'Время сбора'}
              />
            </div>
            <div className={styles.inputs}>
              <InputLine
                type={"text"}
                name={"location"}
                value={inputs.location}
                handler={changeHandler}
                label={'Локация'}
              />
            </div>
            <div className={styles.startend}>
              <div className={styles.inputs}>
                <InputLine
                  type={"date"}
                  name={"startOfTheTour"}
                  value={inputs.startOfTheTour}
                  handler={changeHandler}
                  label={'Дата начала тура'}
                />
              </div>
              <div className={styles.inputs}>
                <InputLine
                  type={"date"}
                  name={"endOfTheTour"}
                  value={inputs.endOfTheTour}
                  handler={changeHandler}
                  label={'Конец тура'}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.textarea}>
          <Textarea
            name={"description"}
            onChange={changeHandler}
            value={inputs.description}
            placeholder={'Введите описание вашего тура'}
          />
        </div>
        <div>
          <ButtonBlank
            color={"green"}
            size={"lg"}
            type={"submit"}
            text={"Создать тур"}
            margin={"5"}
          />
        </div>
      </form>
    </div>
  );
}
