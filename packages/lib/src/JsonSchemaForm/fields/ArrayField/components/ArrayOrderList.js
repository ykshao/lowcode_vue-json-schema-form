/**
 * Created by Liu.Jun on 2020/4/24 16:47.
 */

// 支持数字排序 ，新增 ，删除等操作
export default {
    name: 'ArrayOrderList',
    props: {
        // 需要被排序的VNode list
        vNodeList: {
            type: Array,
            default: []
        },
        // tuple类型的数组，需要固定前值
        tupleItemsLength: {
            type: Number,
            default: 0
        },
        addable: {
            // 是否启用添加
            type: Boolean,
            default: true
        },
        sortable: {
            // 是否可排序
            type: Boolean,
            default: true
        },
        removable: {
            // 是否可移除
            type: Boolean,
            default: true
        },
        maxItems: {
            // 最多添加个数
        },
        minItems: {
            // 最少添加个数
        }
    },
    computed: {
        canAdd() {
            const { addable, maxItems, vNodeList } = this.$props;
            // 配置不可添加
            if (!addable) return false;

            // 配置了最大个数
            if (maxItems !== undefined) {
                return vNodeList.length < maxItems;
            }
            return true;
        },
        canRemove() {
            const { removable, minItems, vNodeList } = this.$props;
            // 配置不可添加
            if (!removable) return false;

            if (minItems !== undefined) {
                return vNodeList.length > minItems;
            }

            return true;
        }
    },
    methods: {
    },
    render(h) {
        // 没有数据，且不能添加不渲染该组件
        if (this.vNodeList <= 0 && !this.addable) return null;

        // 是否可继续添加元素
        return h(
            'div',
            {
                class: {
                    arrayOrderList: true
                }
            },
            this.vNodeList.map(({ key, vNode: VnodeItem }, index) => {
                const trueIndex = this.tupleItemsLength + index;
                return h(
                    'div',
                    {
                        key,
                        class: {
                            arrayOrderList_item: true
                        }
                    },
                    [
                        h(
                            'div',
                            {
                                class: {
                                    arrayListItem_operateTool: true
                                }
                            },
                            [
                                h(
                                    'button',
                                    {
                                        // 配置不可排序不显示排序按钮
                                        style: {
                                            ...(!this.sortable ? {
                                                display: 'none'
                                            } : {})
                                        },
                                        attrs: {
                                            type: 'button',
                                            disabled: !this.sortable || index === 0
                                        },
                                        class: {
                                            arrayListItem_btn: true,
                                            'arrayListItem_orderBtn-top': true,
                                            'el-icon-caret-top': true,
                                        },
                                        on: {
                                            click: () => {
                                                this.$emit('onArrayOperate', {
                                                    command: 'moveUp',
                                                    data: {
                                                        index: trueIndex
                                                    }
                                                });
                                            }
                                        }
                                    }
                                ),
                                h(
                                    'button',
                                    {
                                        // 配置不可排序不显示排序按钮
                                        style: {
                                            ...(!this.sortable ? {
                                                display: 'none'
                                            } : {})
                                        },
                                        attrs: {
                                            type: 'button',
                                            disabled: !this.sortable || index === this.vNodeList.length - 1
                                        },
                                        class: {
                                            arrayListItem_btn: true,
                                            'arrayListItem_orderBtn-bottom': true,
                                            'el-icon-caret-bottom': true,
                                        },
                                        on: {
                                            click: () => {
                                                this.$emit('onArrayOperate', {
                                                    command: 'moveDown',
                                                    data: {
                                                        index: trueIndex
                                                    }
                                                });
                                            }
                                        }
                                    }
                                ),
                                h(
                                    'button',
                                    {
                                        // 配置不可移除不显示移除按钮
                                        style: {
                                            ...(!this.removable ? {
                                                display: 'none'
                                            } : {})
                                        },
                                        attrs: {
                                            type: 'button',
                                            disabled: !this.canRemove
                                        },
                                        class: {
                                            arrayListItem_btn: true,
                                            'arrayListItem_btn-delete': true,
                                            'el-icon-close': true,
                                        },
                                        on: {
                                            click: () => {
                                                this.$emit('onArrayOperate', {
                                                    command: 'remove',
                                                    data: {
                                                        index: trueIndex
                                                    }
                                                });
                                            }
                                        }
                                    },
                                )
                            ]
                        ),
                        h(
                            'div',
                            {
                                class: {
                                    arrayListItem_content: true
                                }
                            },
                            [VnodeItem]
                        )
                    ]
                );
            }).concat([
                h(
                    'p',
                    {
                        style: {
                            ...(!this.canAdd ? {
                                display: 'none'
                            } : {})
                        },
                        class: {
                            arrayOrderList_bottomAddBtn: true,
                        }
                    },
                    [
                        h(
                            'el-button',
                            {
                                class: {
                                    bottomAddBtn: true,
                                },
                                props: {
                                    plain: true,
                                    icon: 'el-icon-plus'
                                },
                                on: {
                                    click: () => {
                                        this.$emit('onArrayOperate', {
                                            command: 'add'
                                        });
                                    }
                                }
                            },
                            [this.maxItems ? `( ${this.vNodeList.length} / ${this.maxItems} )` : '']
                        ),
                    ]
                ),
            ])
        );
    }
};
