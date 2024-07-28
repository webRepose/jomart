const DateFun = (data) => {
  // Компонент который превращает timesstamp в понятный человеку вид
  const hours =
    data && data.toDate().getHours() < 10
      ? "0" + data.toDate().getHours()
      : data.toDate().getHours();
  const minutes =
    data && data.toDate().getMinutes() !== 0
      ? data.toDate().getMinutes() < 10
        ? "0" + data.toDate().getMinutes()
        : data.toDate().getMinutes()
      : data.toDate().getMinutes() + "0";
  return (
    data && data.toDate().toLocaleDateString() + " " + hours + ":" + minutes
  );
};

export default DateFun;
