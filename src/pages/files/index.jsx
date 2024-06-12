import React, { useState, useEffect, useMemo, useRef } from "react";
import { Card, Table, Tag, Button, AutoComplete, Input, Modal } from "antd";
import {
  DownloadOutlined,
  QuestionCircleOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import style from "./index.module.css";
import UploadForm from "./uploadForm";
import UpdateForm from "./updateForm";
import ImgForm from "./imgForm";
import {
  Getfilelist,
  Downloadinfo,
  DelFiles,
  Getcele,
  GetfilesImg,
} from "../../utils/request/api";
import { useDispatch, useSelector } from "react-redux";
import { resetaction } from "../../store/files/filesSlices";
import moment from "moment";

const { Column, ColumnGroup } = Table;
const { Search } = Input;

function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [Eopen, setEOpen] = useState(false);
  const [Dopen, setDOpen] = useState(false);
  const [Eformdata, setEformdata] = useState({});
  const [Eselectid, setEselectid] = useState("");
  const [submitisok, setsubmitisok] = useState(false);
  const [filelist, setfilelist] = useState([]);
  const [celeList, setceleList] = useState([]);
  const [Diseases, setDiseases] = useState([]);
  const [imglist, setimglist] = useState([]);
  const [filter, setFilter] = useState({
    fileAName: "",
    relatedPerson: "",
    relatedLP: "",
    relatedAngle: "",
  });
  const [modal, contextHolder] = Modal.useModal();

  const userRdata = useSelector((state) => state.user.userdata);
  const Reset = useSelector((state) => state.files.reset);
  const fileslist = useSelector((state) => state.files.fileslist);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("fileschange");
    const fileslistcopy = fileslist.map((file) => ({
      ...file,
      key: file.id,
    }));
    console.log(fileslistcopy);
    setfilelist(fileslistcopy);
    Getcele().then((res) => {
      // console.log(res);
      const celearr = res.data.data;
      let selectOption = [];
      let Diseasesoption = [];
      celearr.forEach((e) => {
        if (e.name != "blank") {
          const obj = {};
          obj.value = e.name;
          obj.label = e.name;
          selectOption.push(obj);
        }
        if (e.Diseases != "blank") {
          const obj = {};
          obj.value = e.Diseases;
          obj.label = e.Diseases;
          Diseasesoption.push(obj);
        }
      });
      setceleList(selectOption);
      setDiseases(Diseasesoption);
    });
  }, [fileslist]);

  const clickbb = (e) => {
    setsubmitisok(true);
    // console.log(e);
    Downloadinfo(e).then((res) => {
      setreset((e) => !e);
      // console.log(res);
    });
  };

  const editf = (e) => {
    if (userRdata.level != "0" && userRdata.level != "1") {
      modal.confirm({
        title: "提示",
        icon: <ExclamationCircleOutlined />,
        content: "非管理员不能修改",
        okText: "确认",
        cancelText: "取消",
      });
      return;
    }
    setEOpen(true);
    setEformdata(e);
  };

  const delfiles = (e) => {
    console.log(userRdata);
    if (userRdata.level != "0" && userRdata.level != "1") {
      modal.confirm({
        title: "提示",
        icon: <ExclamationCircleOutlined />,
        content: "非管理员不能删除",
        okText: "确认",
        cancelText: "取消",
      });
      return;
    }
    const delff = () => {
      DelFiles(e).then((res) => {
        // setreset((e) => !e);
        // console.log(res);
        formset();
      });
    };
    modal.confirm({
      title: "提示",
      content: "是否删除",
      okText: "确认",
      cancelText: "取消",
      onOk: delff,
    });
  };

  const detilfiles = (e) => {
    setDOpen(true);
    setEselectid(e);
    GetfilesImg(e).then((e) => {
      console.log(e);
      setimglist(e.data);
    });
  };

  const formset = () => {
    dispatch(resetaction());
  };

  const onSearchfilename = (e) => {
    // console.log(e);
  };

  const celeListSelect = (e) => {
    // console.log(e);
    setFilter((prevFilters) => ({
      ...prevFilters,
      relatedPerson: e,
    }));
  };

  const DiseasesSelect = (e) => {
    // console.log(e);
    setFilter((prevFilters) => ({
      ...prevFilters,
      relatedAngle: e,
    }));
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFilter((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const filteredList = useMemo(() => {
    if (Object.values(filter).some((value) => value.trim() !== "")) {
      // console.log(filter, filelist);
      const filterdata = filelist.filter((item) => {
        // 检查filter的每个键
        return Object.keys(filter).some((key) => {
          // 处理空值情况
          if (!filter[key] || !item[key]) return false;
          return item[key].toLowerCase().includes(filter[key].toLowerCase());
        });
      });
      // console.log(filterdata);
      return filterdata;
    }
    return filelist;
  }, [filter, filelist]);

  const filterOption = (input, option) => {
    // (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
    // console.log(input);
    const label = option?.label ?? "";
    return (
      label.toLowerCase().includes(input.toLowerCase()) || input.length > 0
    );
  };

  const onChange = (value) => {
    // console.log(`selected ${value}`);
  };

  const showModal = () => {
    setOpen(true);
  };
  const handopen = (e) => {
    // console.log(e);
    if (e == "close") {
      setOpen(false);
    }
  };

  const Ehandopen = (e) => {
    // console.log(e);
    if (e == "close") {
      setEOpen(false);
      setEformdata({});
    }
  };

  const Dhandopen = (e) => {
    if (e == "close") {
      setDOpen(false);
    }
  };

  return (
    <>
      <Card
        style={{
          width: "100%",
          margin: "0 15px",
          textAlign: "left",
          paddingLeft: "20px",
        }}
        size="small"
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: "20px", fontWeight: "600" }}>文件管理</span>
          <div>
            <Button type="primary" onClick={showModal}>
              <PlusOutlined />
              上传
            </Button>
            {/* 提交文件 */}
            <UploadForm
              open={open}
              handopen={handopen}
              formset={formset}
              celeList={celeList}
              Diseases={Diseases}
            />
            <UpdateForm
              open={Eopen}
              handopen={Ehandopen}
              formset={formset}
              Eformdata={Eformdata}
              celeList={celeList}
              Diseases={Diseases}
            />
            <ImgForm
              open={Dopen}
              handopen={Dhandopen}
              Eselectid={Eselectid}
              imglist={imglist}
            />
            {contextHolder}
          </div>
        </div>
      </Card>
      <Card
        size="large"
        style={{
          width: "100%",
          margin: "0 15px",
        }}
      >
        <div
          style={{
            display: "flex",
            marginBottom: "10px",
          }}
          className={style.searchsan}
        >
          <Search
            placeholder="文件名字"
            onSearch={onSearchfilename}
            onChange={handleInputChange}
            name="fileAName"
            style={{
              width: 200,
            }}
          />
          <AutoComplete
            options={celeList}
            placeholder="相关名人"
            onSelect={celeListSelect}
          >
            <Input onChange={handleInputChange} name="relatedPerson" />
          </AutoComplete>
          <Search
            placeholder="相关LP"
            onChange={handleInputChange}
            style={{
              width: 200,
            }}
            name="relatedLP"
          />
          <AutoComplete
            options={Diseases}
            placeholder="相关角度"
            onSelect={DiseasesSelect}
          >
            <Input onChange={handleInputChange} name="relatedAngle" />
          </AutoComplete>
        </div>
        <Table
          dataSource={filteredList}
          rowClassName={(resword, index) => {
            let className = "";
            className = index % 2 == 0 ? style.ou : style.ji;
            return className;
          }}
          pagination={{
            pageSize: 20,
          }}
        >
          <Column title="文件名" dataIndex="fileAName" key="firstName" />
          <Column
            title="创建时间"
            key="uploadTime"
            render={(_, record) => {
              const formattedDate = moment(record.uploadTime).format(
                "YYYY-MM-DD"
              );
              return formattedDate;
            }}
          />
          <Column title="上传者" dataIndex="Uploader" key="uploader" />
          <Column
            title="相关名人"
            dataIndex="relatedPerson"
            key="relatedPerson"
          />
          <Column title="相关lp" dataIndex="relatedLP" key="relatedLP" />
          <Column
            title="相关角度"
            dataIndex="relatedAngle"
            key="relatedAngle"
          />
          <Column
            title="操作"
            key="action"
            render={(_, record) => (
              <div style={{ cursor: "pointer" }}>
                <Tag color="#8bc0d8" onClick={() => clickbb(record.id)}>
                  <DownloadOutlined />
                  下载
                </Tag>
                <Tag color="#58c622" onClick={() => editf(record)}>
                  <EditOutlined />
                  修改
                </Tag>
                <Tag color="#f63a4b" onClick={() => delfiles(record.id)}>
                  <DeleteOutlined />
                  删除
                </Tag>
                <Tag color="" onClick={() => detilfiles(record.id)}>
                  <QuestionCircleOutlined />
                  详情
                </Tag>
              </div>
            )}
          />
        </Table>
      </Card>
    </>
  );
}

export default Dashboard;
