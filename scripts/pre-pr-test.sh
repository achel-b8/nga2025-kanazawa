
echo "PRを作成する前にテストを実行しています..."
npm test

if [ $? -ne 0 ]; then
  echo "テストが失敗しました。PRの作成を中止します。"
  exit 1
fi

echo "テストが成功しました。PRを作成します。"
exit 0
