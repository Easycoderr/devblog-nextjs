"use server";

import { getUserByUserName } from "./getUserByUserName";

export async function generateUserName(name: string) {
  let count = 1;
  let newUserName = name
    .trim()
    .toLowerCase()
    .replace(/ /g, "")
    .replace(/[^\w-]+/g, "");

  while (await getUserByUserName(newUserName)) {
    newUserName = `${newUserName}${count}`;
    count++;
  }

  return newUserName;
}
