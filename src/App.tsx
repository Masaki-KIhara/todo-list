function App() {
  const tableHeaderList = ["選択", "登録日", "TODO", "削除"];
  const tableBodyList = [
    { date: "2023/8/11", content: "掃除" },
    { date: "2023/8/11", content: "掃除" },
  ];
  return (
    <>
      <header className="border border-gray bg-gray p-[10px]">
        <h1 className="text-center text-xl text-white">TODOリスト</h1>
      </header>
      <div className="flex gap-[10px] justify-center pt-10">
        <input
          className="pl-[5px] border border-gray rounded w-[200px]"
          placeholder="TODOを入力"
        />
        <button className="border border-gray w-[50px] bg-gray text-white rounded">
          追加
        </button>
      </div>
      <p className="text-center pt-10">本日のTODOは二件です</p>
      <div className="flex justify-center pt-[10px]">
        <table>
          <thead>
            <tr>
              {tableHeaderList.map((item) => {
                return (
                  <th className="bg-gray-100 px-3 py-1 border-[1px] border-gray-200">
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
                    <input type="checkbox" />
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
                        alert(`${key}`);
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
    </>
  );
}

export default App;
