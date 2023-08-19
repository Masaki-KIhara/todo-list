import { ChangeEvent, useState } from "react";
import { CheckTabeleType, TableBodyType } from "../types/todotype";

export const useTodo = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [tableBody, setTableBody] = useState<TableBodyType>({
    date: "",
    content: "",
    checked: false,
  });
  const [tableBodyList, setTableBodyList] = useState<TableBodyType[]>([]);
  const [checkAllState, setCheckedAllState] = useState<boolean>(false);

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    const now = new Date();
    const refistrationDay = `${now.getFullYear()}/${
      now.getMonth() + 1
    }/${now.getDate()}`;
    setTableBody({
      date: refistrationDay,
      content: e.target.value,
      checked: false,
    });
  };

  const addTable = () => {
    setTableBodyList((prev) => [...prev, { ...tableBody }]);
  };

  const deleteTable = (key: number) => {
    tableBodyList.splice(key, 1);
    setTableBodyList((prev) => [...prev]);
  };

  const deleteAllTable = () => {
    if (window.confirm("選択されているTODOを削除しますか？")) {
      setTableBodyList(tableBodyList.filter((item) => item.checked === false));
      setCheckedAllState(false);
    }
  };

  const checkedTable = ({ val, key }: CheckTabeleType) => {
    const upDateList = [...tableBodyList];
    upDateList[key].checked = val.target.checked;
    setTableBodyList(upDateList);
    setCheckedAllState(false);
  };

  const checkAll = (val: ChangeEvent<HTMLInputElement>) => {
    setCheckedAllState(val.target.checked);
    setTableBodyList(
      tableBodyList.map((item) => ({
        ...item,
        checked: val.target.checked,
      }))
    );
  };

  return {
    tableBodyList,
    inputValue,
    checkAllState,
    onChangeInput,
    addTable,
    deleteTable,
    deleteAllTable,
    checkedTable,
    checkAll,
  };
};
