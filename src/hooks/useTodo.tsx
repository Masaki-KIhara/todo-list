import { ChangeEvent, useEffect, useState } from "react";
import { CheckTabeleType, TableBodyType } from "../types/todotype";

export const useTodo = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [tableBody, setTableBody] = useState<TableBodyType>({
    date: "",
    content: "",
    checked: false,
  });
  const [tableBodyList, setTableBodyList] = useState<TableBodyType[]>([]);
  const [checkedList, setCheckedList] = useState<Array<number>>([]);
  const [checkAllState, setCheckedAllState] = useState<boolean>(false);
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const addTable = () => {
    setTableBodyList((prev) => [...prev, tableBody]);
  };

  const deleteTable = (key: number) => {
    tableBodyList.splice(key, 1);
    setTableBodyList((prev) => [...prev]);
  };

  const deleteAllTable = () => {
    if (window.confirm("選択されているTODOを削除しますか？")) {
      setTableBodyList(tableBodyList.filter((item) => item.checked === false));
      setCheckedList([]);
      setCheckedAllState(false);
    }
  };

  //オブジェクトのcheckedを変更する
  const checkedTable = ({ val, key }: CheckTabeleType) => {
    const upDateList = [...tableBodyList];
    upDateList[key].checked = val.target.checked;
    setTableBodyList(upDateList);
    setCheckedAllState(false);
    if (val.target.checked === true) {
      checkedList.push(key);
      setCheckedList(checkedList);
    } else if (val.target.checked === false) {
      checkedList.forEach((item, index) => {
        if (index === key) {
          checkedList.splice(index, 1);
          setCheckedList(checkedList);
        }
      });
    }
  };

  const checkAll = (val: ChangeEvent<HTMLInputElement>) => {
    setCheckedAllState(val.target.checked);
    setTableBodyList(
      tableBodyList.map((item) => ({
        ...item,
        checked: val.target.checked,
      }))
    );
    if (val.target.checked) {
      for (let count = 0; count < tableBodyList.length; count++) {
        checkedList.push(count);
        setCheckedList(checkedList);
      }
    } else if (!val.target.checked) {
      for (let count = 0; count < tableBodyList.length; count++) {
        checkedList.splice(count, 1);
        setCheckedList(checkedList);
      }
    }
  };

  useEffect(() => {
    const now = new Date();
    const refistrationDay = `${now.getFullYear()}/${
      now.getMonth() + 1
    }/${now.getDate()}`;
    setTableBody({
      date: refistrationDay,
      content: inputValue,
      checked: false,
    });
  }, [inputValue]);

  return {
    tableBodyList,
    inputValue,
    checkAllState,
    checkedList,
    onChangeInput,
    addTable,
    deleteTable,
    deleteAllTable,
    checkedTable,
    checkAll,
  };
};
