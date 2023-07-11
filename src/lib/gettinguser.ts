export const f = async () => {
  const res = await fetch("https://reqres.in/api/users/");
  const json = await res.json();
  return json.data;
};
