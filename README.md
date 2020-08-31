# Description

Find here the link on Notion where you can see the pictures for examples: https://www.notion.so/Coding-test-8d15c0771d73449a9ed31e365a239537

The main goals for this test are to evaluate the Javascript skills, the ability to dig into existing code understanding it on an efficient level and the quality of the implementations.

The code is split in two parts: 

- `server`: NodeJS API (Express)
- `web`: ReactJS front-end (with Hooks and SASS modules)

## Server

CRUD API for Parcels. It's using just a JSON file as database to simplify the code. You don't need to worry about the implementation around it, just treat it as a Javascript Object. * It's recommended to create a copy of the db.json file so you can recover its original content if needed.

The database contains:

- `parcels`: Array<{id: number, external_id: string, retailer: number, customer: number}>
- `retailers`: Array<{id: number, name: string>
- `customers`: Array<{id: number, name: string, email: string>

Where parcel.retailer = [retailer.id](http://retailer.id) and parcel.customer = customer.id

The API is structured following a reduced version of the `repository pattern`. Because it's a dummy database we don't have Entities and Models, it's all JS Objects, where the main one is Parcel: `{id: number, external_id: string, retailer: number, customer: number}`

We are separating the code in:

- `Controllers`: endpoint definition. We can define with path and method to listen to
- `Services`: talks to the persistence layer, process the information and exposes it to the controllers
- `Repositories`: interfaces to interact with db. This is usually handled by an ORM

The goal is to create a REST API for Parcel's CRUD operations

## Web

Build with ReactJS using functional components and hooks. For styling, we use SASS modules.

- `Functional components`: cleaner than classic class components and with integration with hooks
- `Hooks`: powerful functions to control the state, references, lifecycle and more
- `SASS modules`: component-scoped SCSS. It automatically creates unique classes for the components, avoiding CSS collision, without losing CSS syntax and SCSS benefits

We use `axios` to perform HTTP requests.

We use `arrow functions` a lot 

```jsx
// full arrow function syntax
const myFunc = (ars) => {
	// body
}
// is equivalent to
function myFunc(args) {
	// body
}

// you can also find short syntax for arrow functions if the body is only a return statement
const myFunc = (args) => {
	return [...args, 'new element']
}
const myFunc = (args) => [...args, 'new element']

// example from the code to create the list of parcels
{parcels.map((parcel) => (
  <ParcelItem parcel={parcel} selected={isSelected(parcel)} onClick={handleOnParcelClick} key={parcel.id} />
))}
```

# How to run

Each folder on the root path is an standalone application. This means we need to run them separately, simulating they are on different servers.

```bash
Run API:
cd server
npm install
# run server without hot reload. Recommended when all changes are done:
npm start
# run server with hot reaload. Useful while developing:
npm run dev
```

```bash
Run Website:
cd web
npm install
# it's created with create-react-app. It includes react-scripts, 
#therefore you get hot reload by default
npm start
```

# Tasks

1. Run both applications and make sure they can talk to each other. Understand the flow, from UI load to database access and all the way back
2. Add a dynamic filter on top of the list of parcels:

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b44a0933-f15f-4f65-8d3a-b87d8cef3ea0/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b44a0933-f15f-4f65-8d3a-b87d8cef3ea0/Untitled.png)

*Tip: In React you need to set a `value` and a `onChange` properties to the `input` fields:

```bash
<input type="text" name="parcelId" value={filters.parcelId} onChange={setFilterValue} />
```

It filters while typing, no need to press a search button

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/69314805-03d5-49d8-9c2a-9197296c946f/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/69314805-03d5-49d8-9c2a-9197296c946f/Untitled.png)

And it uses all the filters at the same time

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b044d77c-8cda-43fe-945e-03dd31ea6d7a/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b044d77c-8cda-43fe-945e-03dd31ea6d7a/Untitled.png)

3. Explain shortly how the `setFilterValue` method works. FYI React's useState hook provides a setter function for each property. In this case, `[filters, setFilters]` means we have to use `setFilters` to update `filters` property. `setFilters` accepts one argument which is the current value of `filters` and it needs to return the value you want next.

Knowing this, please explain the return part:

```jsx
({ ...currentFilters, [e.target.name]: e.target.value })
```

Remember we are using this function on the `inputs` we set for filters

```jsx
onChange={setFilterValue}
```

4. Complete Retailer filter and create Customer email filter

*Extra (you could skip it until you finish the other tasks): build a drop down for retailers that appear on the parcel list:

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/604dad3b-d971-4991-b1a9-dd96f652f05f/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/604dad3b-d971-4991-b1a9-dd96f652f05f/Untitled.png)

5. Create the endpoints to fetch the list of retailers `/retailer/list` and the list of customers `/customer/list` in db

6. Use the previous endpoints to populate the dropdowns in Add Parcel section in `ParcelAction.js`

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e9fa8581-d621-4e2e-add4-6199d5156980/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e9fa8581-d621-4e2e-add4-6199d5156980/Untitled.png)

7. Complete the `createOne` method in `parcel-repository.js` 

- Validate that both retailer and customer exist on db. We can't create a new parcel without both fields. Just return false if they are not present in the new parcel fields or they don't exist in db
- When creating a new parcel, you need to create an `id` and `external_id` properties.
- `id` generation: get the latest id in the existing parcels in db and increment by 1 (simulating auto-increment id behavior)
- `external_id` generation: this filed consist in 2 parts, a prefix + calculated body of 5 numbers
    - prefix: `PP`
    - body: 5 always characters long following the pattern: `xxx + {[parcel.id](http://parcel.id)} + {[retailer.id](http://retailer.id)}`.  Where `xxx are trailing 0 (fill on the left with '0' to reach 5 characters)`, `parcel.id` is the auto-incremented id for the new parcel and `retailer.id` is the id of the retailer associated to the new parcel.
    - For example, new parcel `{customer: 1, retailer: 2}`, assuming the id of the latest parcel in db is `5`, will generate: `PP00062`. `PP` + `000` + `6` + `2`. Another example: new parcel `{customer: 101, retailer: 21}`, assuming the id of the latest parcel in db is `83`, will generate: `PP08421`. `PP` + `0` + `84` + `21`. Of course you can already see the limitation for this approach when we get more than 3 digits of parcels and retailers, but that is out of the scope of this exercise

8. Create a new block on `ParcelAction` to create retailer introducing the name. Make sure that the field on `Add Parcel` block is refreshed to list the new retailer automatically (note that we could reuse existing code to populate those fields)

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5baac12b-1e6b-4a0e-a923-348c2fd5728c/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5baac12b-1e6b-4a0e-a923-348c2fd5728c/Untitled.png)

9. In `ParcelList`, add the ability to select n number of parcels from the list and bulk delete them

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/65c06df3-13c4-47e6-b6b6-743456223d21/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/65c06df3-13c4-47e6-b6b6-743456223d21/Untitled.png)

- If you click on an unselected parcel, selected (add class selected). If you click on a selected parcel, unselect it (remove class selected)
- Show Delete button if there are selected parcels and show how many parcels are selected
- CSS: add hover to change the cursor to pointer to make sure the user knows its clickable

10. Could give a short explanation to this code on `parcel-repository`?

```jsx
function getOne(externalId) {
  const parcel = data['parcels'].find((parcel) => parcel.external_id === externalId);
  // return parcel;
  return { ...parcel };
}
```

Check what happens if you `return parcel` , refresh the page multiple times and explain what you observe. You can leave the comment after the TODO

11. Extra: Modify the CSS of the page at will. You can change colors, layouts, anything you want to make it look more appealing to you