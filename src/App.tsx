import { useTodo } from "./hooks/useTodo";

function App() {
  const tableHeaderList = ["登録日", "TODO", "削除"];
  const {
    inputValue,
    tableBodyList,
    checkAllState,
    onChangeInput,
    addTable,
    deleteTable,
    deleteAllTable,
    checkedTable,
    checkAll,
  } = useTodo();

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
            {tableBodyList.filter((item) => item.checked === true).length !==
              0 && <button onClick={deleteAllTable}>一括削除</button>}
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
