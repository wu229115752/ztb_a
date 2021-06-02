<template>
    <div class="user-credit-page" style="background-color: #ffffff;">
        <div class="table-page-search-wrapper">
            <a-form layout="inline" :form="form" style="padding: 20px">
                <a-row :gutter="48">
                    <a-col :md=8 :sm="24">
                        <a-form-item label="企业名称">
                            <a-input name="entName"
                                     v-decorator="[
                 'entName',
                 { rules: [{ required: false, max: 30, message: '请输入正确的企业名称' }] },
              ]"
                                     type="text" placeholder="请输入企业名称" allowClear/>
                        </a-form-item>
                    </a-col>
                    <a-col :md="14" :sm="24">
                        <a-form-item label="中标起始日期">
                            <a-date-picker
                                    @change="timeRangeChange" :format="format" placeholder="请选择中标起始时间"
                                    style="width: 260px;margin-right: 10px"/>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="48">
                    <a-col :md=8 :sm="24">
                        <a-form-item label="中标项目">
                            <a-input name="title"
                                     v-decorator="[
                 'title',
                 { rules: [{ required: false, max: 50, message: '请输入正确的中标项目' }] },
              ]"
                                     type="text" placeholder="请输入中标项目" allowClear/>
                        </a-form-item>
                    </a-col>
                    <a-col :md="14" :sm="24">
                        <a-form-item label="模板类型">
                            <a-select default-value="请选择模板类型" style="width: 220px" @change="handleSelect">
                                <a-select-option value="all">
                                    全部
                                </a-select-option>
                                <a-select-option value="VfTable">
                                    VfTable
                                </a-select-option>
                                <a-select-option value="pData">
                                    pData
                                </a-select-option>
                                <a-select-option value="tableData">
                                    tableData
                                </a-select-option>
                                <a-select-option value="NgScope">
                                    NgScope
                                </a-select-option>
                            </a-select>
                            <a-button type="primary" icon="search" @click="search">查询</a-button>
                            <a-button @click="reset()" style="margin-left: 10px">重置</a-button>
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
        </div>
        <a-upload
                    name="file"
                    :multiple="true"
                    action="http://192.168.1.115:9999/data/uploadFile"
                    @change="handleChange"
                    :show-upload-list="false"
            >
                <a-button>
                    <a-icon type="upload"/>
                    上传招投标信息
                </a-button>
            </a-upload>

        <a-table :columns="columns" :dataSource="this.entDatas" :pagination="pagination" @change="paginationChange"
                 :showTotal="this.pagination.showTotal"
                 :loading="isLoading" :rowKey="record => {return record.report_id}">
            <a slot="count" slot-scope="text, record">{{record.count+1}}</a>
            <a slot="content" slot-scope="text, record" href="javascript:;" @click="openContent(record)">查看内容详情</a>
        </a-table>

    </div>
</template>

<script>
import axios from 'axios'

const columns = [
    {
        title: '企业名称',
        dataIndex: 'entName',
        key: 'entName',
        align: 'center'
    },
    {
        title: '企业数量',
        dataIndex: 'count',
        key: 'count',
        align: 'center',
        scopedSlots: {customRender: 'count'}
    },
    {
        title: '查看详情',
        key: 'content',
        dataIndex: 'content',
        align: 'center',
        scopedSlots: {customRender: 'content'}
    }
]

export default {
    name: 'userReportCredit',
    components: {},
    data() {
        return {
            // 查询参数
            queryParam: {
                size: 10,
                page: 1,
                platform: 1,
                startTime: null,
                endTime: null
            },
            entDate : {entName:'',content:'',count: 0},
            entDatas : [],
            isLoading: false,
            pagination: {
                showTotal: total => `总共 ${total} 条数据`
            },
            data: [],
            form: this.$form.createForm(this),
            format: 'YYYY-MM-DD',
            columns
        }
    },
    methods: {
        // 重置事件
        reset() {
            this.queryParam = {
                size: 10,
                page: 1,
                startTime: null
            }
            this.data = []
            this.form.resetFields()
        },
        handleChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList)
            }
            if (info.file.status === 'done') {
                this.$message.success(`${info.file.name} 上传成功！`)
            } else if (info.file.status === 'error') {
                this.$message.error(`${info.file.name} 上传失败!`)
            }
        },
        openContent(record) {
            let myWindow = window.open('', '_blank')
            myWindow.document.write(record.content)
        },
        handleSelect(value) {
            this.queryParam['type'] = value === 'all' ? null : value
        },
        getReport(queryParam) {
            this.isLoading = true
            this.entDatas = []
            let _this = this
            // 设置请求参数
            let queryData = {...this.queryParam}
            if (queryParam != null && queryParam !== undefined) {
                Object.assign(queryData, queryParam)
            }
            let url = 'http://192.168.1.115:9999/data/filter?'
            if (queryData.entName) {
                url += 'entName=' + queryData.entName
            }
            if (queryData.title) {
                url += '&title=' + queryData.title
            }
            if (queryData.startTime) {
                url += '&startTime=' + queryData.startTime
            }
            if (queryData.type) {
                url += '&type=' + queryData.type
            }
            axios.get(url).then(res => {
                if (res.data.code === 1) {
                    // 请求成功获取到数据
                    let list = res.data.data
                    _this.data = list
                    list.map((item)=>{
                        let flag = _this.getFlag(item)
                        console.log(flag)
                        if (flag >= 0){
                            _this.entDatas[_this.getFlag(item)].count++
                            _this.entDatas[_this.getFlag(item)].content += `<br/><br/><br/><br/><br/><br/><br/><br/><h1 style="color: red;margin-top: 30px;">第${_this.entDatas[this.getFlag(item)].count+1}家企业</h1>` + item.content
                        } else if (flag === -1){
                            let entDate = {}
                            entDate.entName = item.entName
                            entDate.content = `<h1 style="color: red;">第1家企业</h1>` + item.content
                            entDate.count = 0
                            _this.entDatas.push(entDate)
                        }
                    })
                    console.log(this.entDatas)
                } else {
                    this.$message.error(res.data.msg)
                }
                // 保存请求参数
                _this.queryParam = queryData


                _this.isLoading = false
            }).catch(() => {
                // console.log('处理需要决策报告列表失败:' + JSON.stringify(err))
            }).finally(() => {
                _this.isLoading = false
            })
        },
        getFlag(item){
            if (this.entDatas.length === 0){
                let entDate = {}
                entDate.entName = item.entName
                entDate.content = `<h1 style="color: red;">第1家企业</h1>` + item.content
                entDate.count = 0
                this.entDatas.push(entDate)
                return -2
            }
            for (let i = 0; i < this.entDatas.length; i++) {
                console.log(this.entDatas[i].entName,item.entName)
                if (this.entDatas[i].entName === item.entName){
                    return i
                }
            }
            return -1
        },


        // 分页改变时获取数据
        paginationChange(pagination) {
            this.queryParam['page'] = pagination.current
            this.queryParam['size'] = pagination.pageSize
        },
        //  搜索
        search() {
            this.queryParam.size = 10
            this.queryParam.page = 1
            // eslint-disable-next-line handle-callback-err
            this.form.validateFields((err, values) => {
                this.queryParam['entName'] = values.entName
                this.queryParam['title'] = values.title
                this.getReport(this.queryParam)
            })
        },
        // 日期改变时
        timeRangeChange(date) {
            if (date) {
                this.queryParam.startTime = date.format(this.format)
            } else {
                this.queryParam.startTime = null
            }
        }
    }

}
</script>
