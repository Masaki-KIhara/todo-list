import { ChangeEvent, useEffect, useState } from "react";

type TableBodyType = {
  date: string;
  content: string;
  checked: boolean;
};

type CheckTabeleType = {
  val: ChangeEvent<HTMLInputElement>;
  key: number;
};

function App() {
  const tableHeaderList = ["登録日", "TODO", "削除"];
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

  return (
    <>
      <header className="border border-gray bg-gray p-[10px]">
        <h1 className="text-center text-xl text-white">TODOリスト</h1>
      </header>
      <div className="flex gap-[10px] justify-center pt-10">
        <input
          className="pl-[5px] border border-gray rounded w-[200px]"
          placeholder="TODOを入力"
          value={inputValue}
          onChange={onChangeInput}
        />
        <button
          className="border border-gray w-[50px] bg-gray text-white rounded"
          onClick={addTable}
        >
          追加
        </button>
      </div>
      <p className="text-center pt-10">
        本日のTODOは{tableBodyList.length}個です
      </p>
      <div className="flex justify-center pt-[10px]">
        {tableBodyList.length === 0 ? (
          <p>登録されているTODOはありません。</p>
        ) : (
          <div>
            {checkedList.length !== 0 && (
              <button onClick={deleteAllTable}>一括削除</button>
            )}
            <table>
              <thead>
                <tr>
                  <th className="text-center max-w-[440px] min-w-[120px] border-[1px] border-gray-200">
                    <input
                      type="checkbox"
                      onChange={checkAll}
                      checked={checkAllState}
                    />
                    選択
                  </th>
                  {tableHeaderList.map((item, key) => {
                    return (
                      <th
                        key={key}
                        className="bg-gray-100 px-3 py-1 border-[1px] border-gray-200"
                      >
                        {item}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {tableBodyList.map((item, key) => {
                  return (
                    <tr key={key}>
                      <td className="text-center max-w-[440px] min-w-[120px] border-[1px] border-gray-200">
                        <input
                          type="checkbox"
                          onChange={(val) => {
                            checkedTable({
                              val: val,
                              key: key,
                            });
                          }}
                          checked={tableBodyList[key].checked}
                        />
                      </td>
                      <td className="max-w-[440px] px-[10px] min-w-[120px] border-[1px] border-gray-200 text-center break-all">
                        {item.date}
                      </td>
                      <td className="max-w-[440px] px-[10px] min-w-[120px] border-[1px] border-gray-200 text-center break-all">
                        {item.content}
                      </td>
                      <td className="max-w-[440px] px-[10px] min-w-[120px] border-[1px] border-gray-200 text-center break-all">
                        <button
                          onClick={() => {
                            deleteTable(key);
                          }}
                        >
                          削除
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
