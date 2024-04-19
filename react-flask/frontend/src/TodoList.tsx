import { useState } from 'react';
import { Button, List } from 'antd';
import { Input } from "antd";
import { Flex } from "antd";
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { TodoItem } from "./TodoItem.tsx";


function TodoList() {
    const [allItems, setAllItems] = useState([<TodoItem isChecked={Math.random() < 0.5} description="foo" />, <TodoItem isChecked={Math.random() < 0.5} description="bar" />])
    const [todoInput, setTodoInput] = useState<string | null>(null)

    return (
        <>
            <List
                itemLayout="horizontal"
                dataSource={[...allItems]}
                renderItem={(item) => (
                    <List.Item actions={[<a key="todo-delete" onClick={() => {
                        setAllItems(allItems.filter(e => e != item))
                    }}><DeleteOutlined /></a>]}>
                         {item}
                    </List.Item>
                )}
            />
            <Flex vertical={false} gap="middle">
                <Input placeholder="ToDo Description" value={todoInput != null ? todoInput : ""} onChange={(e) => {
                    console.log(e.target.value)
                    setTodoInput(e.target.value)
                }}/>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => {
                    if(todoInput != null && todoInput != "") {
                        console.log(`Adding ${todoInput} to list`)
                        setAllItems([...allItems, <TodoItem description={todoInput} />])
                        setTodoInput(null)
                    }
                }}>Add ToDo</Button>
            </Flex>
        </>
    )
}

export { TodoList }