import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('little_lemon');

export async function createTable() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'create table if not exists menuitems (id integer primary key not null, name text, description text, image text, price text, category text);'
        );
      },
      reject,
      resolve
    );
  });
}

export async function getMenuItems() {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql('select * from menuitems', [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
}

export function saveMenuItems(menuItems) {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        const placeholders = menuItems.map(() => '(?, ?, ?, ?, ?)').join(', ');
        const values = menuItems.flatMap((item) => [
          item.name,
          item.description,
          item.image,
          item.price,
          item.category,
        ]);

        const sql = `INSERT INTO menuitems (name, description, image, price, category) VALUES ${placeholders}`;
        tx.executeSql(sql, values, (_, result) => {
          resolve(result);
        });
      },
      reject
    );
  });
}

export function truncateMenuItems() {
    db.transaction((tx) => {
      tx.executeSql('drop table menuitems');
    });
}

export async function filterByQueryAndCategories(query, activeCategories) {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        const queryCondition = query ? "name LIKE ?" : "1";
        const categoryCondition = activeCategories.length
          ? `category IN (${activeCategories.map(() => "?").join(", ")})`
          : "1";
  
        const conditions = [queryCondition, categoryCondition].filter(Boolean).join(" AND ");
  
        const sql = `SELECT * FROM menuitems WHERE ${conditions}`;
        const params = [
          query ? `%${query}%` : undefined,
          ...activeCategories,
        ].filter(Boolean);
  
        tx.executeSql(sql, params, (_, { rows }) => {
          resolve(rows._array);
        }, reject);
      });
    });
}